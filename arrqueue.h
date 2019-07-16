template <class T>
class Queue{
	T* theQueue_;
	int capacity_;
	int used_;
	int front_;
	int back_;
	void grow(){
		T* tmp=new T[capacity_+capacity_];
		int j=front_;
		for(int i=0;i<used_;i++){
			tmp[i]=theQueue_[j];
			j=(j+1)%capacity_;
		}
		capacity_=capacity_+capacity_;
		delete []theQueue_;
		theQueue_=tmp;
	}
public:
	Queue(int cap=13){
		capacity_=cap;
		theQueue_=new T[capacity_];
		used_=0;
		front_=0;
		back_=0;
	}
	void enqueue(const T& data){
		if(used_==capacity_){
			grow();
		}
		theQueue_[back_]=data;
		back_=(back+1)%capacity_;
		used_++;
	}
	void dequeue(){
		if(used_!=0){
			used_--;
			front_=(front+1)%capacity_;
		}
	}
	T front() const{
		T rc;
		if(used_!=0){
			rc=theQueue_[front_];
		}
		return rc;
	}
	bool isEmpty() const{
		return used_==0;
	}
	~Queue(){
		delete [] theQueue_;
	}	
};
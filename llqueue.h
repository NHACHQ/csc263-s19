#include "dlist.h"
template <class T>
class Queue{
	DList<T> theQueue_;
public:
	Queue(){}
	void enqueue(const T& data){
		theQueue_.push_back(data);
	}
	void dequeue(){
		theQueue_.pop_front();
	}
	T front() const{
		*(theQueue_.begin());
	}
	bool isEmpty() const{
		return cbegin()==cend()
	}	
};
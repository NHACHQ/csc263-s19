#include "dlist.h"
template <class T>
class Stack{
	DList<T> theStack_;
public:
	Stack(){}
	void push(const T& data){
		theStack_.push_front(data);
	}
	void pop(){
		theStack_.pop_front();
	}
	T top() const{
		*(theStack_.begin());
	}
	bool isEmpty() const{
		return cbegin()==cend()
	}	
};
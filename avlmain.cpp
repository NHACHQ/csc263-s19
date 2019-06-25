#include "avl.h"
#include <iostream>
//To compile:
//c++ avlmain.cpp -std=c++0x

int main(void){
	const int numNodes = 21;
	AVL<int> testTree;

	//note that print-pretty is designed to only go to height 4.  so if tree
	//is taller than 4, it will print in a pre-order manner which may not 
	//be as intuitive to see.
	int dataset[numNodes]={1, 5, 10, 25, 30, 35, 40, 45, 50, 55, 60, 65,
	                        70, 75, 80, 52, 61, 62, 85, 15, 63};


	for(int i=0;i<numNodes;i++){
		testTree.insert(dataset[i]);
		std::cout << "inserting: " << dataset[i] << std::endl;
		if(testTree.height() <= 4){
			testTree.printPretty();
		}
		else{
			testTree.print();
		}
	}

	int rmValue;
	std::cout << "What value would you like to remove? ";
	std::cin >> rmValue;
	std::cout << "remove(" << rmValue << ")" << std::endl;
	testTree.remove(rmValue);
	if(testTree.height() <= 4){
		testTree.printPretty();
	}
	else{
		testTree.print();
	}

	return 0;
}
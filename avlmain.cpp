#include "avl.h"
#include <iostream>

int main(void){
	const int numNodes = 6;
	AVL<int> testTree;

	int dataset[numNodes]={1, 5, 10, 25, 23, 21};


	for(int i=0;i<numNodes;i++){
		testTree.insert(dataset[i]);
		std::cout << "inserting: " << dataset[i] << std::endl;
		testTree.printPretty();
	}

	int rmValue;
/*	std::cout << "What value would you like to remove? ";
	std::cin >> rmValue;
	std::cout << "remove(" << rmValue << ")" << std::endl;
	testTree.remove(rmValue);
	testTree.printPretty();*/

	return 0;
}
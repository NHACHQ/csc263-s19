#include "bst.h"
#include <iostream>

int main(void){
	const int numNodes = 19;
	BST<int> testTree;

	int dataset[numNodes]={18,8,28,4,10,20,34,2,6,14,24,32,36,12,16,22,26,30,38};


	for(int i=0;i<numNodes;i++){
		testTree.insert(dataset[i]);
		std::cout << "inserting: " << dataset[i] << std::endl;
		testTree.printPretty();
	}

	int rmValue;
	std::cout << "What value would you like to remove? ";
	std::cin >> rmValue;
	std::cout << "remove(" << rmValue << ")" << std::endl;
	testTree.remove(rmValue);
	testTree.printPretty();

	return 0;
}
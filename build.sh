#!/bin/bash
nasm -f elf64 main.nasm -o main.o
gcc -c support.c -o support.o
gcc -shared -o libsum.o main.o support.o

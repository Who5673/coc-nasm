section .text 
  global product

product:
  mov rax, rdi 
  mul rax, rsi 
  ret
  

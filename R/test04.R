# optimize

#  nlm 多变量优化


funs = function(x) 2*x[1]*exp(x[1]) + 3*x[2]*x[2] - x[1]*x[2]
min = nlm(funs, c(-1,1))


print(min)

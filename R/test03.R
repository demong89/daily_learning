# 求解方程组：
# solve(x^2-2x+1,x);

# a = matrix(c(2,7,3,8),2,2)
# b = c(1,2)

# # solve(a,b)  
# print(solve(a,b)  )



# a = matrix(c(1:8, 0),3,byrow=TRUE)
# b = rep(1,3);

# print(solve(a,b))
# slove 省去参数b 就是A的逆矩阵、
# print(solve(a))

# x1 = diag(c(1,2,4))
# print(x1)

# print(solve(x1))



# a  = matrix(c(3,2,1,0,2,-3,0,2,4,-8,-2,8,5,4,7,0),4,4);
# b = c(8,-2,9,-1)

# c = solve(a,b)
# print(c)


# 方程求解
# fun = function(x) x*exp(x) -3

# print(fun(0))





# fun = function(x) exp(2*x)+sin(x)*tan(x) - log(x+1) - 3
# print(uniroot(fun,c(0,3)));


# 非线性方程组
# nleqslv 
library(nleqslv)
# fun = function(x) c(x[1]^2+x[2]^2-5, (x[1]+1)*x[2] - (3*x[1]+1))

# sol = nleqslv(c(1,1),fun)

# print(sol)


fun = function(x) c(x[1]*exp(x[1]+x[2])-sin(x[1]+x[2])-3, x[2]*log(1+x[1])-cos(x[2]-3)-4)
sol = nleqslv(c(2,2),fun)
print(sol)

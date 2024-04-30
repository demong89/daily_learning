# x= matrix(1:400,20,20)

# write(x, 'd:/dailyLearning/daily_learning/R/test06-data.txt')



# data = data.frame(
#     Name = c("John", "Jane", "Bob", "Alice"),
#     Age = c(25, 30, 40, 35),
#     Gender = c("Male", "Female", "Male", "Female"),
#     Height = c(170, 165, 180, 165),
#     Weight = c(70, 65, 80, 65),
#     BMI = c(24.9, 20.2, 27.8, 20.5)
# )

# write.csv(data, "d:/dailyLearning/daily_learning/R/test06-csv.csv")
# write.table(data, "d:/dailyLearning/daily_learning/R/test06-table.txt")




# if(any(x<=0)) y=log(1+x) else y=log(x) 
# x=0
# y = if(any(x<=0)) log(1+x) else log(x)

# print(y)



s1 = 0;
s2 = 0;
i = 0

for (i in 1:100) {
    if(i%%2 == 0){
        s1 = s1+i
    }else{
        s2 = s2+ i
    }
}



# print(s1)
# print(s2)


# seq1 = seq(from = 2, to = 100, by = 2)
# print(seq1)


# 编写一个输出1000以内的斐波那契数的程序

f = c(1,1)
i =1;

# while(f[i] + f[i+1]<=1000){
#     f[i+2] = f[i+1]+f[i]
#     i = i+1
# }




repeat{
    f[i+2] = f[i+1]+f[i]
    i = i+1
    if(f[i] + f[i+1] > 1000) break;
}

print(f)
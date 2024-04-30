myString <- "RUNOOB"

# print ( myString )

# Rscript runoob-test.R  

# # 数据准备
# info = c(1, 2, 4, 8)

# # 命名
# names = c("Google", "Runoob", "Taobao", "Weibo")

# # 涂色（可选）
# cols = c("#ED1C24","#22B14C","#FFC90E","#3f48CC")

# # 绘图
# pie(info, labels=names, col=cols)



table = data.frame(
    姓名 = c("张三", "李四","王五", "李奎", "赵六"),
    年龄 = c(25,26,28,29,30),
    工号 = c("001","002","003","004","005"),
    月薪 = c(1000, 2000, 3000, 4000, 5000)
    
)


# print(table) # 查看 table 数据

# 根据条件选择 
# print(table[table$姓名 == "李四",])


# 数据框的数据结构可以通过 str() 函数来展示：
# str(table)

# summary() 可以显示数据框的概要信息：
# print(summary(table))


# 定义一个向量，包含需要筛选的条件：
# condition = c(25, 30)

# 根据条件筛选数据：
# result = table[table$年龄 %in% condition, ]

# 打印筛选结果：
# print(result)


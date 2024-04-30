# 读写数据文件 read.table  scan 


# rt = read.table("d:/dailyLearning/daily_learning/R/houses2.data", header=TRUE)

# print(rt)

# sc = scan("d:/dailyLearning/daily_learning/R/weight.data")

# print(sc)



# sc = scan("d:/dailyLearning/daily_learning/R/h_w.data", list(height = 0,weight = 0))

# print(sc)


# x=scan();

# name = scan(what='');

# scores = read.csv("d:/dailyLearning/daily_learning/R/educ_scores.csv")
# print(scores);


# 假设你想从"data.csv"文件中读取数据，并指定列名
# column_names <- c("学啥", "学啥", "学啥","学啥","学啥")  # 自定义列名列表
# data <- read.csv("d:/dailyLearning/daily_learning/R/educ_scores.csv", col.names = column_names)

# 若CSV文件的第一行是列名，但你想忽略并使用自定义列名
# data <- read.csv("d:/dailyLearning/daily_learning/R/educ_scores.csv", header = FALSE, col.names = column_names)


# print(data)
# 若CSV文件的第一行已经是列名，且你只想修改某些列的名称
# 先读取数据，然后使用`names()`函数修改列名
# data <- read.csv("d:/dailyLearning/daily_learning/R/data.csv")
# names(data)[1:3] <- c("NewColumn1", "NewColumn2", "NewColumn3")  # 修改前3列的列名

# # 显示数据框以确认列标题
# head(data)


# library(openxlsx)
# # install.packages(readxl)
# library(readxl)

# # 读取Excel文件
# data <- read_xlsx("d:/dailyLearning/daily_learning/R/educ_scores.xlsx")

# print(data)
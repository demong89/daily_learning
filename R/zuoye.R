

# 加载必要的R包
library(ggplot2)
# library(dplyr)
library(factoextra)
library(GGally)
library(fmsb)
library(kableExtra)



# set.seed(123) # 设置随机种子以保证结果的可复现性
# n_customers <- 1000 # 客户数量
# purchase_frequency <- sample(1:10, n_customers, replace = TRUE) # 购买频率
# avg_spending <- abs(rnorm(n_customers, mean = 50, sd = 20)) # 平均消费金额
# recency <- sample(1:365, n_customers, replace = TRUE) # 最近一次购买距今天数

# customer_data <- data.frame(
#   CustomerID = 1:n_customers,
#   PurchaseFrequency = purchase_frequency,
#   AvgSpending = avg_spending,
#   Recency = recency
# )


# 设置随机数种子以确保结果的可复现性
set.seed(42)

# 定义用户属性范围
user_ids <- 1:1000
genders <- c("Male", "Female")
ages <- sample(18:65, length(user_ids), replace = TRUE) # 假设年龄在18到65之间
occupations <- c("Student", "Engineer", "Teacher", "Doctor", "Business")
regions <- c("North", "South", "East", "West", "Central")
history_orders <- sample(0:50, length(user_ids), replace = TRUE) # 历史订单数量
avg_amounts <- round(runif(length(user_ids), min = 50, max = 500), 2) # 平均消费金额，假设介于50到500之间
recent_purchase_days <- sample(0:365, length(user_ids), replace = TRUE) # 最近一次购买距离今天的天数

# 构建数据框
customer_data <- data.frame(
  UserID = user_ids,
  Gender = sample(genders, length(user_ids), replace = TRUE),
  Age = ages,
  Occupation = sample(occupations, length(user_ids), replace = TRUE),
  Region = sample(regions, length(user_ids), replace = TRUE),
  HistoryOrders = history_orders,
  AvgConsumption = avg_amounts,
  RecentPurchaseDays = recent_purchase_days
)


write.csv(customer_data,"d:/dailyLearning/daily_learning/R/runoob.csv")



  gender_consumption_plot <- ggplot(customer_data, aes(x = Gender, y = AvgConsumption)) +
  geom_boxplot() + labs(title = "Gender vs Average Consumption", x = "Gender", y = "Average Consumption")
# print(gender_consumption_plot)

# customer_data$AgeGroup <- cut(customer_data$Age, breaks = seq(18, 65, by = 10), include.lowest = TRUE, labels = paste(seq(18, 65, by = 10), "-", seq(28, 75, by = 10) - 1))
# age_distribution <- ggplot(customer_data, aes(x = AgeGroup)) +
#   geom_bar() +
#   labs(title = "Age Distribution", x = "Age Group", y = "Count")


occupation_orders <- ggplot(customer_data, aes(x = Occupation, y = HistoryOrders)) +
  geom_boxplot() +
  labs(title = "Occupation vs History Orders", x = "Occupation", y = "History Orders")
# occupation_orders

print(occupation_orders)


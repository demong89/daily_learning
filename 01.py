import openai
import os

# 加载.env文件
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())

# 从环境变量中获得你的OpenAI Key
openai.api_key = os.getenv('OPENAI_API_KEY')

##  模型列表
models = openai.Model.list()

for model in models.data:
	print(model.id)
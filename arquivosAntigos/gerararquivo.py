import pandas as pd
import random
import string

# Número de linhas desejado
num_linhas = 300000

# Gerar dados aleatórios
dados = {
    'Nome': [''.join(random.choices(string.ascii_letters, k=8)) for _ in range(num_linhas)],
    'Quantidade_Vendas': [random.randint(1, 100) for _ in range(num_linhas)],
    'sku': [random.randint(300, 1000) for _ in range(num_linhas)],
    'Produto': [''.join(random.choices(string.ascii_letters, k=8)) for _ in range(num_linhas)],
    
}

# Criar DataFrame com os dados
df = pd.DataFrame(dados)

# Salvar o DataFrame em um arquivo CSV
# df.to_csv('5k_linhas_pandas.csv', sep=';' ,index=False)

df.to_excel('250k_linhas_pandas.xlsx',index=False)

print(f'Arquivo CSV gerado com sucesso')
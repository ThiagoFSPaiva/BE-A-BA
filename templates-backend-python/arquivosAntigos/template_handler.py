import pandas as pd
import psycopg2
import xlwt

from app.database import get_connection

def validate_file_with_template(file, template_id):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT name, tipo FROM campo WHERE template_id = %s;", (template_id,))
        results = cursor.fetchall()

        cursor.execute("SELECT extensao FROM template WHERE id = %s;", (template_id,))
        extensao = cursor.fetchone()[0]  # Ajuste aqui para acessar o primeiro valor da tupla
        print(extensao)
        df_campo = pd.DataFrame(results)

        if file.filename.split('.')[-1] != extensao:
            return False, 'Extensão do arquivo não corresponde ao template selecionado'


        if extensao == 'xlsx':
            df_temp = pd.read_excel(file, engine='xlsxwriter')
        elif extensao == 'xls':
            df_temp = pd.read_excel(file)
        elif extensao == 'csv':
            df_temp = pd.read_csv(file, sep=";")

        expected_columns = df_campo[0].tolist()
        expected_types = dict(zip(df_campo[0], df_campo[1]))

        for column in df_temp.columns:
            if column not in expected_columns:
                return False, f"O nome da coluna '{column}' não foi encontrado no DataFrame lido."
            if str(df_temp[column].dtype) != expected_types[column]:
                return False, f"O tipo de dados para a coluna '{column}' não corresponde ao esperado."

        return True, None

    except Exception as e:
        print(f"Ocorreu um erro ao buscar dados do banco de dados: {e}")
        return False, "Erro ao buscar dados do banco de dados"
    finally:
        cursor.close()
        conn.close()
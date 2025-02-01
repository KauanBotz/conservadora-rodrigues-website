from flask import Flask, render_template
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', 
                         google_maps_api_key=os.getenv('GOOGLE_MAPS_API_KEY', ''))

@app.route('/quem-somos')
def quem_somos():
    return render_template('quem_somos.html')

@app.route('/servicos')
def servicos():
    return render_template('servicos.html')

@app.route('/orcamento')
def orcamento():
    return render_template('orcamento.html')

@app.route('/trabalhe-conosco')
def trabalhe_conosco():
    return render_template('trabalhe_conosco.html')

@app.route('/contato')
def contato():
    return render_template('contato.html')

@app.route('/endereco')
def endereco():
    return render_template('endereco.html')

if __name__ == '__main__':
    app.run(debug=True)

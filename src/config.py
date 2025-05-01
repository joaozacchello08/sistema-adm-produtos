from pathlib import Path

app_path = Path.home() / "Documents" / "SistemaAdmLoja" # store our data at documents path
app_path.mkdir(parents=True, exist_ok=True) # create directory if doesn't exists

salesHistoryFile = app_path / "historico_de_vendas.txt" # set our sales history text file
db_path = app_path / "products.db" # set our db file path

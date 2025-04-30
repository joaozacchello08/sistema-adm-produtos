from pathlib import Path
from src.adm_db import start_db

app_path = Path.home() / "Documents" / "SistemaAdmLoja" # store our data at documents path
app_path.mkdir(parents=True, exist_ok=True) # create directory if doesn't exists
db_path = app_path / "products.db" # set our db file path

start_db()

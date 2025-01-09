from fastapi import FastAPI, HTTPException
    from pydantic import BaseModel
    import sqlite3

    app = FastAPI()

    class Wallet(BaseModel):
        address: str
        comment: str | None = None

    @app.on_event("startup")
    def startup():
        conn = sqlite3.connect('wallets.db')
        c = conn.cursor()
        c.execute('''CREATE TABLE IF NOT EXISTS wallets
                     (id INTEGER PRIMARY KEY AUTOINCREMENT,
                      address TEXT UNIQUE NOT NULL,
                      comment TEXT,
                      is_tracking BOOLEAN DEFAULT 1)''')
        conn.commit()
        conn.close()

    @app.post("/wallets")
    async def add_wallet(wallet: Wallet):
        conn = sqlite3.connect('wallets.db')
        c = conn.cursor()
        try:
            c.execute("INSERT INTO wallets (address, comment) VALUES (?, ?)",
                     (wallet.address, wallet.comment))
            conn.commit()
            return {"message": "Wallet added successfully"}
        except sqlite3.IntegrityError:
            raise HTTPException(status_code=400, detail="Wallet already exists")
        finally:
            conn.close()

    @app.get("/wallets")
    async def get_wallets():
        conn = sqlite3.connect('wallets.db')
        c = conn.cursor()
        c.execute("SELECT address, comment FROM wallets WHERE is_tracking = 1")
        wallets = [{"address": row[0], "comment": row[1]} for row in c.fetchall()]
        conn.close()
        return {"wallets": wallets}

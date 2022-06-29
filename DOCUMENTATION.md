## **1. Az alkalmazás célja**

Az alkalmazás egy festmény galéria adminisztrációs felülete.

## **2. Az alkalmazás telepítése**

- Forkolni kell az adott GitHub repository tartalmát:

    https://github.com/sassgit/vizsgaremek

- A célgépre le kell klónozni az adott GitHub repository tartalmát.

   `git clone https://github.com/sassgit/vizsgaremek`

- Ha még nincsen fenn a célgépen, akkor telepíteni kell az Angular keretrendszert az `npm i -g @angular/cli` paranccsal.

- Ha még nincsen fenn a célgépen, akkor telepíteni kell a `docker` alkalmazást.

- a `vizsgaremek/backend` mappába be kell másolni a `.env` fájlt és a `config` mappát a benne lévő fájlokkal együtt  (`default.json` és `test.json`)

    - Ezek a fájlok tartalmazzák a szerverhez való csatlakozás beállításait, ezek nélkül nem fut az alkalmazás!

    - A `.env` fájl tartalmazz a portot egy secret kulcsot, és azt a beállítást, hogy a bejelntekzési token meddig érvényes:
```
PORT="3000"
SECRET="**********"
EXPIRES_IN="1h"
```

-
    - `default.json` fájl formátuma (a szerver elérési utat és a felhasználónevet/jelszót be kell írni):

```
{
  "database": {
    "host":"mongodb+srv://...",
    "user": "username",
    "pass": "********"
  }
}
```

- be kell lépni a `vizsgaremek/backend` mappába

- A terminálban ki kell adni az `npm run deploy` parancsot
    
    - Ennek hatására települnek a függőségek és egy docker-ben elindul az alkalmazás

## **3. Az alkalmazás konfigurálása**

A `vizsgaremek/frontend/src/environments/` mappában be lehet állítani az API végpont elérési útvonalát: 

  - `environment.ts` állományban: `apiUrl: "http://localhost:3000/"`
  - `environment.prod.ts` állományban: `apiUrl: "http://localhost:3000/"`


A `docker` beállításokat a `docker-compose.yml` fájlban lehet módosítani.

## Swagger dokumentáció:

  - http://localhost:3000/api-docs




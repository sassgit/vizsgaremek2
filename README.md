# ___Festény webáruház adminisztrációs felület___

> vizsgaremek feladat: `nodejs/express` backend és `Angular` frondend.

***
Az alkalmazás egy festmény webáruház adminisztrációs felülete.

Az alábbi adatokat lehet kezelni általa:

- festmények
- fotók (a festményekről)
- művészek
- vevők
- megrendelések
- számlák
- adminisztrációs felület felhasználói

## adatstruktúra

- festmények
  - művész ?: id
  - cím : string
  - típus (pl olaj, akvarell, rézkarc) : string
  - egyéb adatok a műről ?: string
  - fotók ?: id-k tömbje
  - összesen készült darabszám (általában 1) : number
  - raktáron darabszám : number
  - ár : number
- fotó
  - tárolt fájlnév : string
  - alt : string
  - fájlméret byte-ban : number
- művész-ek
  - polgári név : string
  - művésznév ?: string
  - egyéb adatok ?: string
- vevők
  - név : string
  - irányítószám ?: string
  - város ?: string
  - utca/hsz ?: string
  - ország ?: string
  - e-mail: ?: string
  - jelszó kódolva ?: string
- megrendelések
  - vevő : id
  - termékek : tömb festmény id-je
  - megjegyzés ?: string
  - állapot (megrendelve - feldolgozva - leszállítva) : string
  - számla azonosító ?: string
  - számla állapot ?: string
  - végösszeg esetleges kedvezménnyel (ezért nem föltétlen termékek árainak összege) : number
- users (admin felület felhasználói)
  - e-mail : string
  - kódolt jelszó : string
  - jogosultságok : number



## __Felhasználói történetek__

1. Az oldalt csak bejelentkezve lehessen használni.
    * __elfogadási kritérium:__ _Ha nincs bejelentkezve minden esetben a bejelentkezési oldalra vezessen._
1. Az adminisztrációs felület felhasználói 3 jogosultsággal rendelkezhetnek:
    * Adminisztrátor
      * minen adatot megtekinthet/módosíthat/törölhet (beleértve a users tömböt is)
    * Szerkesztő
      * Mindent olvashat, és a `users` adatok kivételével mindent írhat
    * Olvasó
      * Minden adatot olvashat.
    * __elfogadási kritérium:__ _Az fenti működésmód a felhasználók jogosultságai terén_
1. Felső Navigációs sáv.
    * __elfogadási kritérium:__ _Navigációs sáv ahol látható a bejelentkezett felhasználó neve, login és logout gombok, valamint beállítható hogy hány adat jelenik meg egy sorban (10 - 50 - 100)_
1. Oldalsáv
    * __elfogadási kritérium:__ _Oldalsó sávban lehet kiválasztani hogy melyik adattípus listája látható_
1. Adatlisták
    * __elfogadási kritérium:__ _Valamennyi lista egységesen kiírja az a megadott számú adatokat táblázatos formában, valamint gombokat: szerkesztés, törlés_
1. ID mezők kezelése
    * __elfogadási kritérium:__ _Az id mezők nem jelennek meg, hanem azok helyett az adott dokumentum jellemző adata (tipikusan név) jelenik meg_
1. Adatlistában Szerkesztés gomb-ra kattintva módostíthatók az adatok
    * __elfogadási kritérium:__ _Egy form-on mezőkben módosíthatók az adatok. Az id-k nem szerkeszthetők, itt is az adott objektum jellemző adata (neve) jelenik meg, és arra kattintva ki lehet választani egy másikat egy megjelenő listából_
1. Adatlistában Törlés gomb-ra kattintva törölhetők az adatok
    * __elfogadási kritérium:__ _Törlés előtt figyelmeztető üzenet jelenik meg_
1. Az adatlisták alján lapozó van a további adatok megjelenítéséhez.
    * __elfogadási kritérium:__ _működő lapozó első, utolsó, előző, következő link-ek, és számokkal jelölt oldalkiválasztók, sok adat esteén sok oldal megfelelő kezelése (csak az aktuálishoz közeli oldalak-hoz linkek)_
1. Az adatlisták alján "Új létrehozása" gomb van.
    * __elfogadási kritérium:__ _Az új létrehozása hatására egy új objektumot lehet létrehozni ugyanazzal a form-al, amivel szerkeszteni is lehet_
1. A fotók adatlistából megnyíló form-on a fájlmérete nem változtatható.
    * __elfogadási kritérium:__ _A fotók adatlistából megnyíló form-on a fájlmérete nem változtatható._
1. A fotók adatlistához nem "új létrehozása", hanem feltöltés gomb van, amivel képfájlokat lehet feltölteni a szerverre.
    * __elfogadási kritérium:__ _A kiválasztott fájlokat a szerverre feltölti, a szerveren ha már van ugyanolyan nevű fájl, akkor a feltöltött fájl nevéhez egy hozzáad egy `_x`, ahol `x` egy szám úgy, hogy olyan nevű fájl feltöltve ne szerepeljen_
1. A fotók adatai között a tárolt fájlnév nem módosítható
    * __elfogadási kritérium:__ _Mind a frontend, mint a backend részen tiltott a módosítása_
1. A kódolt jelszavak kódjai nem láthatók, helyette * vagy hasonló jel(ek) szerepelnek, megváltoztatásához külön szabályok érvényesek.
    * __elfogadási kritérium:__ _Az adminisztrátor jogosultságú felhasználó tetszőlegesen változtathat meg jelszavakat. A többi felhasználó (`user`) csak a saját jelszavát változtathatja meg a korábbi beírásával_





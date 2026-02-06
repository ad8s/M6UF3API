# API ACCESS A DADES

Aquesta API es connecta a MongoDB i retorna informació depenent del endpoint que s'utilitzi.

---

## ENDPOINTS

| Mètode | Endpoint | Descripció |
|--------|----------|------------|
| GET | [https://m6uf3api-two.vercel.app/list](https://m6uf3api-two.vercel.app/list) | Retorna totes les entrades de la base de dades. |
| GET | [https://m6uf3api-two.vercel.app/list/:dataInici/:dataFi](https://m6uf3api-two.vercel.app/list/:dataInici/:dataFi) | Retorna les entrades entre dues dates (`dataInici` i `dataFi`). |
| POST | [https://m6uf3api-two.vercel.app/add](https://m6uf3api-two.vercel.app/add) | Afegeix una nova entrada a la base de dades. |
| PUT | [https://m6uf3api-two.vercel.app/update/:id](https://m6uf3api-two.vercel.app/update/:id) | Actualitza els camps d'una entrada específica segons el seu `_id`. |
| DELETE | [https://m6uf3api-two.vercel.app/delete/:id](https://m6uf3api-two.vercel.app/delete/:id) | Elimina una entrada segons el seu `_id`. |

---

## EXEMPLES D'ÚS

### 1. Obtenir entrades entre dates

```http
GET https://m6uf3api-two.vercel.app/list/2025-12-01T00:00:00.000Z/2025-12-05T23:59:59.999Z
```
---
### 2. Afegir una nova entrada

```http
POST https://m6uf3api-two.vercel.app/add
Content-Type: application/json

{
  "nomAlumne": "Adrian",
  "cognom1": "Sanchez",
  "cognom2": "Ruiz",
  "dataEntradaTasca": "2026-02-03T10:00:00.000Z",
  "completa": true,
  "observacions": "test"
}
```
---
### 3. Actualitzar una entrada

```http
PUT https://m6uf3api-two.vercel.app/update/6985a13b524908cbf884e236
Content-Type: application/json

{
  "completa": false,
  "observacions": "Actualitzat"
}
```
---
### 4. Eliminar una entrada

```http
DELETE https://m6uf3api-two.vercel.app/delete/6981b728ba303ee01a42c163
```
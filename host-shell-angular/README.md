# Host Shell Angular (4200)
Host con Module Federation + navbar (Authors/Movies/Reviews).
`npm i` + `npm run start` -> http://localhost:4200

## Remotos integrados

| Ruta      | Remoto     | Módulo expuesto |
| --------- | ---------- | --------------- |
| /authors  | `:4201/remoteEntry.js` | `./AuthorsPage` |
| /movies   | `:4202/remoteEntry.js` | `./routes`      |
| /reviews  | `:4203/remoteEntry.js` | `./ReviewsPage` |

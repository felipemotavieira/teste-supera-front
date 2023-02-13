# teste-supera-front

## Acesso à aplicação 
Para facilitar o acesso à aplicação optei por fazer o deploy do front no vercel. Ele pode ser acessado através do link "https://teste-supera-front.vercel.app/". Caso os produtos não renderizem automaticamente e o console aponte um erro relacionado à cross origin/CORS policy basta baixar alguma extensão que corrija o erro. Reitero que não é um erro da aplicação. Para o firefox recomendo extensão CORS Everywhere encontrada no link "https://addons.mozilla.org/pt-BR/firefox/addon/cors-everywhere/". Para o Chrome a extensão Allow CORS encontrada no link "https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf". De todo modo, outras extensões semelhantes também devem funcionar, mas estas duas foram as que eu testei. É importante lembrar que é necessário ativar a extensão depois da sua instalação. 

### Mas também é possível rodar a aplicação localmente:

Para rodar localmente a aplicação é necessário primeiro abrir um terminal na pasta teste-supera-front. Então, é necessário instalar as dependências do projeto com o comando: 

```
yarn
```

Com as dependências instaladas, basta rodar a aplicação com o comando:

```
yarn start
```

Pronto! A página de front da aplicação deve ser carregada automaticamente no seu localhost!

### Sobre a aplicação
Utilizei a lib de componentes chakra ui para otimizar o tempo de desenvolvimento do front. Como ele era apenas um extra, também não me dediquei muito a estilizá-lo, embora a lib seja completamente customizável, pois preferi focar no back.

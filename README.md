# Preview automático com Firebase Hosting

Este repositório está configurado para publicar uma versão de **preview** no [Firebase Hosting](https://firebase.google.com/docs/hosting) a cada Pull Request.

## Como funciona

- A ação [Firebase Hosting Preview](.github/workflows/firebase-preview.yml) roda para todo **pull request**.
- Após instalar as dependências e executar `yarn build`, o workflow usa [`FirebaseExtended/action-hosting-deploy`](https://github.com/FirebaseExtended/action-hosting-deploy) para criar um channel `pr-<número do PR>`.
- O Firebase gera uma URL no formato:
  `https://PROJECT_ID--pr-<número do PR>-RANDOM_HASH.web.app`
  (a URL exata aparece nos logs da action).

## Limpeza manual

Os channels expiram automaticamente após alguns dias, mas também é possível removê-los manualmente executando o workflow **Delete Firebase preview channel** e informando o número do PR.

## Segredos necessários

Crie os seguintes segredos no repositório:

- `FIREBASE_SERVICE_ACCOUNT`: conteúdo JSON da conta de serviço com permissão de deploy no Hosting.
- `FIREBASE_PROJECT_ID`: ID do projeto Firebase usado nos deploys.

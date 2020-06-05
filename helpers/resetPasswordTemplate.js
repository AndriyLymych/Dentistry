module.exports = (name, middleName,token) => {

    return `
         <br>
         <p> <strong>Добрий день, ${name} ${middleName}. Для відновлення паролю перейдіть за посиланням:</strong></p>
         <a href="http://localhost:3000/auth/password-refresh/${token}"> ${token} </a>
         `;
}
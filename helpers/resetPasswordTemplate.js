module.exports = (name, middleName,token) => {

    return `<h1> Password change </h1>
         <br>
         <p>Добрий день, ${name} ${middleName}. Для відновлення паролю перейдіть за посиланням:</p>
         <a href="http://localhost:3000/auth/password-refresh?t=${token}"> ${token} </a>
         `;
}
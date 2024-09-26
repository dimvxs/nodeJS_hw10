var express = require('express');
var path = require('path'); 
var fs = require('fs');
var querystring = require('querystring')
var app = express();
var news = express();
var about = express();





app.post('/submit', function(request, response){
    if (request.url == "/submit" && request.method == "POST") 
        {
            var filePath = './storage.txt';
            let storage = '';

            request.on('data', buffer =>{
                storage += buffer.toString();
            })

            request.on('end', () => {
                // Парсинг данных из запроса
                console.log('Data received:', storage);
                var query = querystring.parse(storage);
                var body = JSON.stringify(query); 

            fs.writeFile(filePath, body, (err) => {
                if(err) throw err;
            });
         

            fs.readFile(filePath, function (err, data) { 

                // обработка ошибок
                if (err) {
                    console.log(err);
                    response.writeHead(404, { 'Content-Type': 'text/plain' });

                } else {
                    response.writeHead(200, { 'Content-Type': 'text/html' }); 
                    // записать в ответ содержимое читаемого файла 
                    response.write(data.toString());
                    
                    console.log(`success!`);

                }

                response.end();
            });

        });
    }

        else
            {
                var pathFile = path.join(__dirname, 'html', 'index.html');
        
                fs.readFile(pathFile, function(err, data){
                    if(err){
                        console.log(err);
                        responce.writeHead(404, { 'Content-Type' : 'text/html'});
                    }
                    else{
                        responce.writeHead(200, { 'Content-Type' : 'text/html'});
                        responce.write(data.toString());
                    }
                })
            }

})










app.get('/', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname, 'html/home.html'));
});


news.on('mount', function(){
    console.log('news mounted');
});



news.get('/', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname, 'html/news.html'));
});



news.get('/article', function(request, response){
    response.send(`
        <h2>Лучший работник:</h2>
        <br />
        <p>T. 098-456-67-65</p>
        <h2>Иван Иванов — профессионал, которому можно доверять</h2>
        <p>Иван Иванов — один из тех редких специалистов, чьи знания и опыт делают его настоящим мастером своего дела. Уже более пяти лет он работает в области разработки программного обеспечения, создавая надежные и высокоэффективные решения для клиентов. Иван обладает глубокими знаниями в языках программирования, таких как JavaScript, Python и SQL, и активно применяет их для решения самых сложных задач.</p>
        <p>Одной из его ключевых черт является внимательность к деталям и умение грамотно подходить к каждому проекту. Он всегда стремится не только выполнить задание, но и сделать это с максимальной точностью и качеством. Иван великолепно справляется с дедлайнами, умеет эффективно распределять свое время и ресурсы команды, а его работа всегда характеризуется стабильностью и отсутствием критических ошибок.</p>
        <p>Кроме того, Иван отлично работает в команде. Его коллеги всегда отмечают его открытость, желание помочь и способность к конструктивному диалогу, что делает его незаменимым сотрудником в любом проекте.</p>
    `);
    
})


about.on('mount', function(){
    console.log('about mounted');
})

about.get('/', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname, 'html/about.html'));
});

about.get('/user', function(request, responce){
    responce.send(`<h1>Биография Ивана Иванова</h1>
    
    <section>
        <h2>Личная информация</h2>
        <p>Имя: Иван Иванов</p>
        <p>Дата рождения: 15 мая 1990 года</p>
        <p>Место рождения: Москва, Россия</p>
    </section>

    <section>
        <h2>Образование</h2>
        <ul>
            <li>2007-2011: Бакалавриат, МГТУ им. Баумана, факультет компьютерных технологий</li>
            <li>2011-2013: Магистратура, МГТУ им. Баумана, программная инженерия</li>
        </ul>
    </section>

    <section>
        <h2>Карьера</h2>
        <p>Иван начал свою карьеру в 2013 году в компании «ТехСофт», где работал младшим разработчиком. За несколько лет он поднялся до ведущего инженера и стал неотъемлемой частью команды, создавая сложные программные решения для клиентов из разных секторов.</p>
        
        <p>В 2018 году Иван присоединился к компании «ИнноваСофт», где работает до сих пор. Здесь он руководит командами разработчиков и занимается проектами по внедрению систем автоматизации и разработки ПО для крупных предприятий.</p>
    </section>

    <section>
        <h2>Навыки</h2>
        <ul>
            <li>Программирование: JavaScript, Python, SQL</li>
            <li>Веб-разработка: Node.js, Express, React</li>
            <li>Базы данных: MySQL, MongoDB</li>
            <li>Управление проектами: Agile, Scrum</li>
        </ul>
    </section>

    <section>
        <h2>Личные качества</h2>
        <p>Иван отличается вниманием к деталям, высоким уровнем ответственности и умением работать в команде. Его аналитический склад ума и умение быстро находить решения делают его ценным специалистом на любом проекте.</p>
    </section>
    
    <footer>
        <p>Контактная информация:</p>
        <p>Телефон: 098-456-67-65</p>
        <p>Email: ivan.ivanov@example.com</p>
    </footer>`);
})


app.get('/login', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname, 'html/login.html'));
});

app.get('/register', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname, 'html/register.html'));
});

// связывание главного приложения со вложенными
app.use('/news', news);
app.use('/about', about);



app.listen(8080, function(){
    console.log('server start on port 8080');
});


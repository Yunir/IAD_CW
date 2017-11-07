'use strict';
const Article = require('../models/DefineArticle');
const Image = require('./Image');

Article.prototype.createArticle = function (id, title, body, content, main, imageid){
    Article.create({
        id: id,
        title: title,
        body: body,
        content: content,
        main: main,
        imageId: imageid
    });
};

Article.prototype.loadArticlesStart = function (req, res) {
    Article.findAll({
        raw: true
    }).then(function (articles) {
        console.log(articles);
        var arr = new Array();
        var i;
        for(i = articles.length -1; i>=0; i--){
            arr[i] = articles[i].imageId;
        }
        Image.findAll({
            where: {
                id: arr 
            },
            raw: true
        }).then(function(images){
            res.render('index.ejs', {title: articles, count: articles.length, image: images});
        })
    });
};

Article.prototype.loadArticlesButtonClick = function (req, res) {
    const addCount = 3;
    Article.findAll({
        raw: true
    }).then(function (articles) {
        var count = req.body.count;
        var c = 0;
        console.log(articles);
        var arr = new Array();
        for(i = articles.length -1; i>=0; i--){
            arr[i] = articles[i].imageId;
        }
        Image.findAll({
            where: {
                id: arr 
            },
            raw: true
        }).then(function (images) {
            console.log("length: " + images.length);
            var result = '{ "articles": ['
            for(i = articles.length - 1; i >=0; i--){
                if(count>0){
                    count--;
                    continue;
                }
                if(c === addCount){
                    break;
                }
                if( c !== 0){
                    result += ", "
                }
                c++;
                var url;
                var j;
                for(j = 0; j < images.length; j++){
                    if(images[j].id === articles[i].imageId){
                        url = images[j].url;
                        break;
                    }
                }
                result += '{ "title": "' + articles[i].title + '", "body": "' + articles[i].body +'", "image": "' + url +'" } ';
            }
            result += ' ], "count": "' + c + '" }';
            console.log(result);
            res.send(result);
        });
    });
};

Article.prototype.deleteArticle = function (id){
    Article.destroy({
        where:{
            id: id
        }
    })
};

Article.prototype.updateArticle  = function (id, title, body, content, main, imageid){
    console.log('start updating');
    if(typeof title != 'undefined' && title!=''){
        console.log('OK');
        const newData = {
            title: title
        };
        Article.update(newData, {
            where: {id: id}
        })
    }
    if(typeof body != 'undefined' && body!=''){
        console.log('OK');
        const newData = {
            body: body
        };
        Article.update(newData, {
            where: {id: id}
        })
    }
    if(typeof content != 'undefined' && content!=''){
        console.log('OK');
        const newData = {
            content: content
        };
        Article.update(newData, {
            where: {id: id}
        })
    }
    if(typeof main != 'undefined' && main!=''){
        console.log('OK');
        const newData = {
            main: main
        };
        Article.update(newData, {
            where: {id: id}
        })
    }
    if(typeof imageid != 'undefined' && imageid!=''){
        console.log('OK');
        const newData = {
            imageId: imageid
        };
        Article.update(newData, {
            where: {id: id}
        })
    }
    console.log('sucsess');
};

module.exports = Article;
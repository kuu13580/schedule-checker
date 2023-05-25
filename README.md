# DB設計
![ER](/DB_ER_diagram.drawio.png)

# 環境
|  | version |
| --- | --- |
| PHP | v8.1.18 |  
| NodeJS | v18.12.0 |  
| Laravel | v10.8.0 |  
| MySQL | v14.14 |  

# DBセッティング
```bash
mysql -u root < ./db_setup.sql
php artisan migrate
php artisan db:seed
```
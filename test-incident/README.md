```
post:- http://localhost:8000/api/incident/
   body:- {
        "incident_details": "Hboello How are you",
        "status": "Closed",
        "priority": "Low",
        "entity": "Government",
        "reporter_name": "Bittu Singh"
    }


Get:- http://localhost:8000/api/incident/
Put:- http://localhost:8000/api/incident/RMG102982025/
```

### Django Project Setup (Incident Management)

#### 0. Virtual Environment (Optional)
It is recommended to set up the project environment without using a virtual environment for the sake of simplicity and ease of setup. However, this step is optional and can be skipped if preferred.

#### 1. Install Required Dependencies
Ensure you have Python installed. Then, install the required dependencies by running:

```bash
pip install -r requirements.txt
```

#### 2. Database Configuration

Make sure your database settings in `settings.py` are configured correctly. Here is the relevant section for MySQL:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'incident_management',  # Name of your database
        'USER': 'root',  # Your MySQL username
        'PASSWORD': 'root',  # Your MySQL password
        'HOST': 'localhost',  # Database host (localhost if running locally)
        'PORT': 3306,  # MySQL default port
    }
}
```

Ensure your MySQL database is set up:

```bash
CREATE DATABASE incident_management;
```

#### 3. Migrations

After setting up the database, you need to make and apply migrations:

```bash
# Make migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate
```

#### 4. Create Superuser (Optional)

To access the Django admin panel, create a superuser:

```bash
python manage.py createsuperuser
```

You will be prompted to enter a username, email, and password.

#### 5. Run the Development Server

Start the Django development server:

```bash
python manage.py runserver
```

By default, the server will run on `http://127.0.0.1:8000/`.

### Summary of Steps:

1. Django:
   - Install requirements: `pip install -r requirements.txt`
   - Create the database in MySQL.
   - Apply migrations: `python manage.py makemigrations` and `python manage.py migrate`
   - Create a superuser: `python manage.py createsuperuser`
   - Run the server: `python manage.py runserver`

2. Please contact at `bittusinghtech@gmail.com` for any query.


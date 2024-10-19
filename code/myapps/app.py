from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect

app = Flask(__name__)

# Configure the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///trucks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Translation dictionary for different languages
translations = {
    "User Input": {"en": "User Input", "ru": "Ввод пользователя", "uk": "Введення користувача"},
    "Fetch Story": {"en": "Fetch Story", "ru": "Получить историю", "uk": "Отримати історію"},
    "Start Reading": {"en": "Start Reading", "ru": "Начать чтение", "uk": "Розпочати читання"},
    "Pause Reading": {"en": "Pause Reading", "ru": "Приостановить чтение", "uk": "Призупинити читання"},
    "Resume Reading": {"en": "Resume Reading", "ru": "Продолжить чтение", "uk": "Продовжити читання"},
    "Stop Reading": {"en": "Stop Reading", "ru": "Остановить чтение", "uk": "Зупинити читання"},
    "Slow": {"en": "Slow", "ru": "Медленно", "uk": "Повільно"},
    "Normal": {"en": "Normal", "ru": "Нормально", "uk": "Нормально"},
    "Fast": {"en": "Fast", "ru": "Быстро", "uk": "Швидко"},
    "Speed": {"en": "Speed", "ru": "Скорость", "uk": "Швидкість"},
    "Word Translation": {"en": "Word Translation", "ru": "Перевод слова", "uk": "Переклад слова"},
    "Choose File": {"en": "Choose File", "ru": "Выберите файл", "uk": "Виберіть файл"},
    "Upload and Analyze Image": {"en": "Upload and Analyze Image", "ru": "Загрузить и анализировать изображение", "uk": "Завантажити та аналізувати зображення"},
    "Reading Helper": {"en": "Reading Helper", "ru": "Помощник для чтения", "uk": "Помічник для читання"},
    "Light": {"en": "Light", "ru": "Светлая", "uk": "Світла"},
    "Dark": {"en": "Dark", "ru": "Темная", "uk": "Темна"},
    "Pitch": {"en": "Pitch", "ru": "Тон", "uk": "Тон"},
    "Speaking Rate": {"en": "Speaking Rate", "ru": "Скорость речи", "uk": "Швидкість мови"},
    "Voice Gender": {"en": "Voice Gender", "ru": "Пол голоса", "uk": "Стать голосу"},
    "Female": {"en": "Female", "ru": "Женский", "uk": "Жіночий"},
    "Male": {"en": "Male", "ru": "Мужской", "uk": "Чоловічий"},
    "Back to Home": {"en": "Back to Home", "ru": "Назад на главную", "uk": "Повернутися додому"},
    "Trucking Helper": {"en": "Trucking Helper", "ru": "Помощник для грузоперевозок", "uk": "Помічник для вантажоперевезень"},
    "Truck Name": {"en": "Truck Name", "ru": "Имя грузовика", "uk": "Назва вантажівки"},
    "Height (feet)": {"en": "Height (feet)", "ru": "Высота (футы)", "uk": "Висота (фути)"},
    "Width (feet)": {"en": "Width (feet)", "ru": "Ширина (футы)", "uk": "Ширина (фути)"},
    "Length (feet)": {"en": "Length (feet)", "ru": "Длина (футы)", "uk": "Довжина (фути)"},
    "Weight (pounds)": {"en": "Weight (pounds)", "ru": "Вес (фунты)", "uk": "Вага (фунти)"},
    "Save Truck": {"en": "Save Truck", "ru": "Сохранить грузовик", "uk": "Зберегти вантажівку"},
    "Select a Truck": {"en": "Select a Truck", "ru": "Выберите грузовик", "uk": "Виберіть вантажівку"},
    "Remove Selected Truck": {"en": "Remove Selected Truck", "ru": "Удалить выбранный грузовик", "uk": "Видалити вибрану вантажівку"},
    "Getting location...": {"en": "Getting location...", "ru": "Получение местоположения...", "uk": "Отримання місцезнаходження..."},
    "Enter destination address": {"en": "Enter destination address", "ru": "Введите адрес назначения", "uk": "Введіть адресу призначення"},
    "Truck saved successfully!": {"en": "Truck saved successfully!", "ru": "Грузовик успешно сохранен!", "uk": "Вантажівка успішно збережена!"},
    "Please fill out all truck details.": {"en": "Please fill out all truck details.", "ru": "Пожалуйста, заполните все данные о грузовике.", "uk": "Будь ласка, заповніть усі деталі вантажівки."},
    "Truck removed successfully!": {"en": "Truck removed successfully!", "ru": "Грузовик успешно удален!", "uk": "Вантажівка успішно видалена!"},
    "Please select a truck to remove.": {"en": "Please select a truck to remove.", "ru": "Выберите грузовик для удаления.", "uk": "Виберіть вантажівку для видалення."},
    "Error calculating truck route.": {"en": "Error calculating truck route.", "ru": "Ошибка при расчете маршрута грузовика.", "uk": "Помилка під час розрахунку маршруту вантажівки."},
    "No results found": {"en": "No results found", "ru": "Результаты не найдены", "uk": "Результатів не знайдено"},
    "Error finding address": {"en": "Error finding address", "ru": "Ошибка поиска адреса", "uk": "Помилка пошуку адреси"},
    "Your Current Location": {"en": "Your Current Location", "ru": "Ваше текущее местоположение", "uk": "Ваше поточне місцезнаходження"},
    "Error: Unable to retrieve your location.": {"en": "Error: Unable to retrieve your location.", "ru": "Ошибка: невозможно получить ваше местоположение.", "uk": "Помилка: неможливо отримати ваше місцезнаходження."},
    "Error: Geolocation is not supported by this browser.": {"en": "Error: Geolocation is not supported by this browser.", "ru": "Ошибка: геолокация не поддерживается этим браузером.", "uk": "Помилка: цей браузер не підтримує геолокацію."},
    "Please select a truck first.": {"en": "Please select a truck first.","ru": "Пожалуйста, выберите грузовик.","uk": "Будь ласка, виберіть вантажівку."}
}

# Truck model for the database
class Truck(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    height = db.Column(db.Float, nullable=False)  # Height in meters
    width = db.Column(db.Float, nullable=False)   # Width in meters
    length = db.Column(db.Float, nullable=False)  # Length in meters
    weight = db.Column(db.Float, nullable=False)  # Weight in kilograms

# Create the database tables
@app.before_request
def create_tables():
    inspector = inspect(db.engine)
    if not inspector.has_table('truck'):  # Check if the 'truck' table exists
        db.create_all()

# Route for the home page
@app.route('/')
def home():
    lang = request.args.get('lang', 'en')
    return render_template('index.html', translations=translations, lang=lang)

@app.route('/ai_helper')
def ai_helper():
    lang = request.args.get('lang', 'en')
    return render_template('ai_helper.html', translations=translations, lang=lang)
    
# Route for Trucking Helper
@app.route('/trucking_helper')
def trucking_helper():
    lang = request.args.get('lang', 'en')
    return render_template('trucking_helper.html', translations=translations, lang=lang)

# Convert feet to meters
def feet_to_meters(feet):
    return feet * 0.3048

# Convert pounds to kilograms
def pounds_to_kg(pounds):
    return pounds * 0.453592

# Route to add a new truck
@app.route('/add_truck', methods=['POST'])
def add_truck():
    data = request.json
    new_truck = Truck(
        name=data['name'],
        height=feet_to_meters(data['height']),
        width=feet_to_meters(data['width']),
        length=feet_to_meters(data['length']),
        weight=pounds_to_kg(data['weight'])
    )
    db.session.add(new_truck)
    db.session.commit()
    return jsonify({'message': 'Truck added successfully'})

# Route to get all trucks
@app.route('/get_trucks', methods=['GET'])
def get_trucks():
    trucks = Truck.query.all()
    trucks_list = [{'id': truck.id, 'name': truck.name, 'height': truck.height, 'width': truck.width, 'length': truck.length, 'weight': truck.weight} for truck in trucks]
    return jsonify(trucks_list)

# Route to remove a truck by ID
@app.route('/remove_truck/<int:truck_id>', methods=['DELETE'])
def remove_truck(truck_id):
    truck = Truck.query.get(truck_id)
    if truck:
        db.session.delete(truck)
        db.session.commit()
        return jsonify({'message': 'Truck removed successfully'})
    else:
        return jsonify({'error': 'Truck not found'}), 404

# Route to handle location updates from the client-side
@app.route('/update_location', methods=['POST'])
def update_location():
    latitude = request.form.get('latitude')
    longitude = request.form.get('longitude')
    return "Location updated successfully!", 200

# Main block to run the app
if __name__ == '__main__':
    app.run(debug=True)

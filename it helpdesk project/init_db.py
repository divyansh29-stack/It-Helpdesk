from app import app, db, User
from werkzeug.security import generate_password_hash

def init_db():
    with app.app_context():
        # Create database tables
        db.create_all()
        
        # Check if technicians already exist
        if User.query.filter_by(role='technician').count() == 0:
            # Create five technicians
            technicians = [
                {
                    'username': 'tech1',
                    'email': 'tech1@company.com',
                    'password': generate_password_hash('tech123'),
                    'role': 'technician',
                    'department': 'IT Support',
                    'designation': 'Senior IT Technician',
                    'employee_code': 'TECH001'
                },
                {
                    'username': 'tech2',
                    'email': 'tech2@company.com',
                    'password': generate_password_hash('tech123'),
                    'role': 'technician',
                    'department': 'IT Support',
                    'designation': 'IT Technician',
                    'employee_code': 'TECH002'
                },
                {
                    'username': 'tech3',
                    'email': 'tech3@company.com',
                    'password': generate_password_hash('tech123'),
                    'role': 'technician',
                    'department': 'IT Support',
                    'designation': 'IT Technician',
                    'employee_code': 'TECH003'
                },
                {
                    'username': 'tech4',
                    'email': 'tech4@company.com',
                    'password': generate_password_hash('tech123'),
                    'role': 'technician',
                    'department': 'IT Support',
                    'designation': 'IT Technician',
                    'employee_code': 'TECH004'
                },
                {
                    'username': 'tech5',
                    'email': 'tech5@company.com',
                    'password': generate_password_hash('tech123'),
                    'role': 'technician',
                    'department': 'IT Support',
                    'designation': 'IT Technician',
                    'employee_code': 'TECH005'
                }
            ]
            
            for tech in technicians:
                user = User(**tech)
                db.session.add(user)
            
            db.session.commit()
            print("Successfully created five technicians!")
        else:
            print("Technicians already exist in the database.")

if __name__ == '__main__':
    init_db() 
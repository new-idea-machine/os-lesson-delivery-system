from sqlalchemy.orm import Session

from . import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()


def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int): # Is this an attempt to create Quiz ?
    db_item = models.Item(**item.dict(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

#Do we need to write code for CREATE for Quiz and Question?

# A constant for the error message
INTERNAL_SERVER_ERROR_MESSAGE = "An internal server error occurred"

# Get Quiz by ID with error handling
def get_quiz(db: Session, quiz_id: int):
    try:
        return db.query(models.Quiz).filter(models.Quiz.id == quiz_id).first()
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail=INTERNAL_SERVER_ERROR_MESSAGE)


# Get All Quizzes with error handling
def get_all_quizzes(db: Session, skip: int = 0, limit: int = 100):
    try:
        return db.query(models.Quiz).offset(skip).limit(limit).all()
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail=INTERNAL_SERVER_ERROR_MESSAGE)

#Get Question by ID
def get_question(db: Session, question_id: int):
    try:
        return db.query(models.Questions).filter(models.Questions.id == question_id).first()
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail=INTERNAL_SERVER_ERROR_MESSAGE)

#Get All Questions
def get_questions_for_quiz(db: Session, quiz_id: int):
    try:
        return db.query(models.Questions).filter(models.Questions.quiz_id == quiz_id).all()
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail=INTERNAL_SERVER_ERROR_MESSAGE)

#Get All Folders
def get_folders(db: Session, skip: int = 0, limit: int = 100):
    try:
        return db.query(models.Folders).offset(skip).limit(limit).all()
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail=INTERNAL_SERVER_ERROR_MESSAGE)

#Get All Categories
def get_categories(db: Session, skip: int = 0, limit: int = 100):
    try:
        return db.query(models.Categories).offset(skip).limit(limit).all()
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail=INTERNAL_SERVER_ERROR_MESSAGE)


    
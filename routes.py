from flask import render_template, request, flash, redirect, url_for
from app import app
import logging

@app.route('/')
def index():
    """Main landing page"""
    return render_template('index.html')

@app.route('/booking', methods=['POST'])
def booking():
    """Handle booking form submission"""
    try:
        name = request.form.get('name', '').strip()
        phone = request.form.get('phone', '').strip()
        
        # Basic validation
        if not name or not phone:
            flash('Пожалуйста, заполните все поля', 'error')
            return redirect(url_for('index') + '#booking')
        
        if len(phone) < 10:
            flash('Пожалуйста, введите корректный номер телефона', 'error')
            return redirect(url_for('index') + '#booking')
        
        # Log the booking request (in production, save to database)
        logging.info(f"Booking request received: Name={name}, Phone={phone}")
        
        flash('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.', 'success')
        return redirect(url_for('index') + '#booking')
        
    except Exception as e:
        logging.error(f"Error processing booking: {e}")
        flash('Произошла ошибка. Пожалуйста, попробуйте позже.', 'error')
        return redirect(url_for('index') + '#booking')

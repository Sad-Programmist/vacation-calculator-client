import React, { useState } from 'react';
import axios from 'axios';

const MainPage = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isSixDayWorkWeek, setIsSixDayWorkWeek] = useState('');
    const [averageSalary, setAverageSalary] = useState('');
    const [result, setResult] = useState('');

    const serverPath = 'http://localhost:8080/vacation/calculate';

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(serverPath + '?averageSalary=' + averageSalary + '&vacationStartDate=' + startDate + '&vacationEndDate=' + endDate + '&isSixDayWorkWeek=' + isSixDayWorkWeek);
            setResult('Размер ваших отпускных составит: ' + response.data.vacationPay.toFixed(2));
        } catch (error) {
            alert('Ошибка сервера');
        }
    };

    return (
        <div class="container">
            <div class="text">
                Калькулятор отпускных
            </div>
            <form onSubmit={handleSubmit}>
                <div class="form-row">
                    <div class="input-data">
                        <input required type='text' maxLength={10} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <div class="underline"></div>
                        <label for="">Дата начала отпуска (дд.мм.гггг)</label>
                    </div>
                    <div class="input-data">
                        <input required type='text' maxLength={10} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        <div class="underline"></div>
                        <label for="">Дата конца отпуска (дд.мм.гггг)</label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="input-data">
                        <input required type='number' value={averageSalary} onChange={(e) => setAverageSalary(e.target.value)} />
                        <div class="underline"></div>
                        <label for=""> Средняя зарплата за последние 12 месяцев</label>
                    </div>
                </div>

                <label class="checkbox-container">Шестидневная рабочая неделя
                    <input
                        type="checkbox"
                        onChange={(e) => setIsSixDayWorkWeek(e.target.checked)}
                    />
                    <span class="checkmark"></span>
                </label>
                <div class="form-row submit-btn">
                    <div class="input-data">
                        <div class="inner"></div>
                        <input type='submit' value='Рассчитать' />
                    </div>
                </div>
                <div class="form-row">
                    <div class="input-data">
                        <div class="result">{result}</div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MainPage;

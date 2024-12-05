import React, { useState, useEffect, useRef } from 'react';
import infosList from './infosList';
import InfoImage from './InfoImage';
import { Link } from 'react-router-dom';
import { fetchSignInfo } from '../services/SignUpService';

function SignScreen() {
    const [allFormsValidated, setAllFormsValidated] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        const form = formRef.current;
        const confirmPasswordInput = form.querySelector('#validationCustom05');

        const handleInput = () => confirmPasswordInput.setCustomValidity('');

        form.addEventListener('submit', handleFormSubmit);
        confirmPasswordInput.addEventListener('input', handleInput);

        return () => {
            form.removeEventListener('submit', handleFormSubmit);
            confirmPasswordInput.removeEventListener('input', handleInput);
        };
    }, []);


    function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        if (!form.checkValidity() || !validatePassword(form)) {
            event.stopPropagation();
        } else {
            sendDataToServer(form);
        }
        form.classList.add('was-validated');
    }

    function validatePassword(form) {
        const passwordInput = form.querySelector('#validationCustom04');
        const confirmPasswordInput = form.querySelector('#validationCustom05');

        if (passwordInput.value !== confirmPasswordInput.value) {
            alert('passwords do not match')
            confirmPasswordInput.setCustomValidity('Passwords do not match')
            return false;
        }
        return true;
    }
    function readImageFile() {
        const fileInput = document.getElementById('validationCustom06');
        const file = fileInput.files[0];
        return new Promise((resolve, reject) => {
            if (!file) {
                reject(new Error('No file selected'));
            }
            const reader = new FileReader();
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    }


    const sendDataToServer = async () => {
        try {
            const formData = {
                userName: document.getElementById('validationCustom03').value,
                password: document.getElementById('validationCustom04').value,
                firstName: document.getElementById('validationCustom01').value,
                lastName: document.getElementById('validationCustom02').value,
                profilePic: await readImageFile(),
            };
            const serverResponse = await fetchSignInfo(formData);
            if (serverResponse.success) {
                setAllFormsValidated(true);
            } else {
                alert(serverResponse.message);
            }
        } catch (error) {
            alert('Error occurred: ' + error.message);
        }
    };

    useEffect(() => {
        const fileInput = document.getElementById('validationCustom06');
        const previewImage = document.getElementById('previewImage');

        fileInput.addEventListener('change', function () {
            const file = this.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    previewImage.src = e.target.result;
                };

                reader.readAsDataURL(file);
            } else {
                previewImage.src = '';
            }
        });
    }, []);

    return (
        <div className="col-lg-7 col-s-1" openingscree="true" id='openingScreen'>
            <form ref={formRef} className="row g-3 needs-validation SignUpScreen d-flex p-2" noValidate>
                {infosList}
                <InfoImage />
                <div className="col-12">
                    <button className="btn btn-primary" id="danger-btn" name="move1" type="submit">Sign Up</button>
                    {allFormsValidated &&
                        <Link to='/'>
                            <button className='btn btn-primary'>
                                Welcome! Log In
                            </button>
                        </Link>
                    }
                </div>
            </form>
        </div>
    );
}

export default SignScreen;

import './App.css';
import contractABI from "./abi.json"
import React from 'react';
import {Formik} from "formik";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ethers = require('ethers');


function App() {
    const contractAddress = "0xF9485A09B0fB0A4AB7874Dc66B3D494Ee5ce823C";


    async function requestAccount() {
        await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
    }

    async function updateName(name) {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();
            const contract =
                new ethers.Contract(contractAddress, contractABI, await signer);
            try {
                const transaction = await contract.updateName(name);
                await transaction.wait();
            } catch (err) {
                console.error('Error:', err);
            }

        }
    }

    async function updateAge(age) {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();
            const contract =
                new ethers.Contract(contractAddress, contractABI, await signer);
            try {
                const transaction = await contract.updateAge(age);
                await transaction.wait();
            } catch (err) {
                console.error('Error:', err);
            }
        }
    }


    async function getEntityDetails() {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, await signer);

            try {
                document.getElementById("display").textContent = await contract.getEntityDetails();
                toast.success("Information retrieved")
            } catch (err) {
                console.error('Error:', err);
            }

        }
    }


    const handleNameSubmit = async (values, {setSubmitting, resetForm}) => {
        if (values.Message !== null && values.Message !== "") {
            await updateName(values.Message);
            resetForm();
            await setSubmitting(true);
            toast.success("Name Saved")
        } else {
               toast.error("Empty Name!")
        }
    };
    const handleAgeSubmit = async (values, {setSubmitting, resetForm}) => {
        if (values.Message !== null && values.Message > 1) {
            await updateAge(values.Message);
            resetForm();
            await setSubmitting(true);
            toast.success("Age Saved")
        } else {
            toast.error("Invalid Age!")
        }

    };


    return (
        <div className="App">
            <header className="App-header">
                <h2>Information</h2>
                <div id={"whole"}>
                    <div className={"inputs"}>
                        <section className="form">
                            <Formik initialValues={{Message: ''}} onSubmit={handleNameSubmit}>
                                {({
                                      values,
                                      handleChange,
                                      handleBlur,
                                      handleSubmit,
                                      isSubmitting,
                                  }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <input
                                                className={"name"}
                                                type="text"
                                                name="Message"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.Message}
                                                placeholder="Type your name here..."
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={`btn ${isSubmitting ? 'submitting' : ''}`}
                                            >
                                                {isSubmitting ? 'Saving Name...' : 'Input Name'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                            <Formik initialValues={{Message: ''}} onSubmit={handleAgeSubmit}>
                                {({
                                      values,
                                      handleChange,
                                      handleBlur,
                                      handleSubmit,
                                      isSubmitting,
                                  }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <input
                                                className={"name"}
                                                type="number"
                                                name="Message"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.Message}
                                                placeholder="Type your age here..."
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={`btn ${isSubmitting ? 'submitting' : ''}`}
                                            >
                                                {isSubmitting ? 'Saving Age...' : 'Input Age'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </section>
                    </div>
                    <hr/>
                    <div>
                        <button id="but" onClick={() => getEntityDetails()}>
                            Get Information
                        </button>
                        <h1 id="display"></h1>
                    </div>
                </div>
            </header>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default App;

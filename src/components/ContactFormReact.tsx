import { useState } from 'react';

const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

const styles = {
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    formInput: {
        width: '75%',
        border: 'transparent',
        borderRadius: '8px',
        padding: '10px',
        margin: '10px 0'
    },
    button: {
        border: '1pt solid black',
        borderRadius: '8px',
        backgroundColor: '#009933',
        color: 'white',
        padding: '10px',
        width: '30%'
    },
    buttonDisabled: {
        border: '1px solid #999999',
        borderRadius: '8px',
        backgroundColor: '#cccccc',
        color: '#666666',
        padding: '10px',
        width: '30%'
    }
}

export const ContactForm = () => {
    const [btnDisabled, setBtnDisabled] = useState(true);

    return (
        <div style={styles.formContainer}>
            <input style={styles.formInput} type='text' placeholder="Name" required />
            <input style={styles.formInput} type='email' placeholder="Email" required />
            <textarea style={styles.formInput} placeholder="Message" required />
            <button style={btnDisabled ? styles.buttonDisabled : styles.button} type="button" disabled>Submit</button>
        </div>
    )
}
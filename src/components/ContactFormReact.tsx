import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

type IEmailResponse = {
    status: number;
    text: string;
}

export const ContactForm = () => {
    const [desktopScreen, setDesktopScreen] = useState(window.matchMedia("(min-width: 600px)").matches)
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [btnHover, setBtnHover] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    // const [contacted, setContacted] = useState('');  // has to be a string because controlled by a cookie

    useEffect(() => { // listen for screen size and check for contacted cookie
        window.matchMedia("(min-width: 600px)").addEventListener('change', (e) => setDesktopScreen(e.matches));
        // const contactedCookie = document.cookie.split('; ').find((row) => row.startsWith('contacted='));
        // if (!contactedCookie) {
        //     document.cookie = 'contacted=false';
        // }
        // setContacted(contactedCookie.split('=')[1]);
    }, [])

    useEffect(() => {  // validate form
        const validationChecks = {
            nameValid: false,
            emailValid: false,
            messageValid: false
        }
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            validationChecks.emailValid = true;
            setEmailError('');
        } else { setEmailError('Please enter a valid email address') }
        validationChecks.nameValid = name ? true : false;
        validationChecks.messageValid = message ? true : false;
        // if (contacted === 'false') {
        //     setBtnDisabled(!Object.values(validationChecks).every(item => item === true))
        // }
        setBtnDisabled(!Object.values(validationChecks).every(item => item === true))
    }, [name, email, message])

    const sendEmail = () => {
        const templateParams = {
            name: name,
            email: email,
            message: message
        }
        emailjs.send(
            import.meta.env.PUBLIC_SERVICE_ID, 
            import.meta.env.PUBLIC_TEMPLATE_ID, 
            templateParams,
            import.meta.env.PUBLIC_EMAIL_PUBLIC_KEY
        ).then((response: IEmailResponse) => {
            if (response.status === 200) {
                setName('');
                setEmail('');
                setMessage('');
                setSuccessMessage('Thanks for reaching out!');
                // setContacted('true');
                // document.cookie = 'contacted=true;max-age=86400';
            }
        });
    }

    const styles = {
        formContainer: {
            display: 'flex',
            flexDirection: 'column' as 'column',
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
            backgroundColor: btnHover ? '#00cc44' : '#009933',
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
        },
        errorText: {
            color: 'red',
            padding: '10px',
            borderRadius: '8px',
            fontSize: '10pt',
            fontWeight: 'bold'
        },
        successText: {
            color: 'white',
            margin: '20px 20px'
        }
    }

    const desktopStyles = {
        formInput: {
            width: '40%',
            border: 'transparent',
            borderRadius: '8px',
            padding: '10px',
            margin: '10px 0'
        },
        button: {
            border: '1pt solid black',
            borderRadius: '8px',
            backgroundColor: btnHover ? '#00cc44' : '#009933',
            color: 'white',
            padding: '10px',
            width: '10%',
            cursor: btnHover ? 'pointer' : null
        },
        buttonDisabled: {
            border: '1px solid #999999',
            borderRadius: '8px',
            backgroundColor: '#cccccc',
            color: '#666666',
            padding: '10px',
            width: '10%'
        },
    }

    return (
        <div style={styles.formContainer}>
            <input style={desktopScreen ? desktopStyles.formInput : styles.formInput} type='text' placeholder="Name*"
                onChange={(e) => setName(e.target.value)} value={name} />
            <input style={desktopScreen ? desktopStyles.formInput : styles.formInput} type='email' placeholder="Email*" 
                onChange={(e) => setEmail(e.target.value)} value={email} />
            <textarea style={desktopScreen ? desktopStyles.formInput : styles.formInput} placeholder="Message*"
                onChange={(e) => setMessage(e.target.value)} value={message} />
            <button type="button"
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                onClick={sendEmail}
                style={ // lol there has to be a better way to do this
                    desktopScreen
                    ? btnDisabled 
                        ? desktopStyles.buttonDisabled : desktopStyles.button
                    : btnDisabled
                        ? styles.buttonDisabled : styles.button}
                disabled={btnDisabled}>Submit</button>

            {emailError && email && email.length >= 12
            ? <p style={styles.errorText}>{emailError}</p> 
            : null}

            {successMessage && 
            <p style={styles.successText}>{successMessage}</p>}
        </div>
    )
}
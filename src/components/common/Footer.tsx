import React from 'react';

import './Footer.css';
import {useTranslation} from "react-i18next";

function Footer() {
    const { t } = useTranslation();
    return (
        <div className="Footer-info">
            <p className="Footer-person">
                {t("organiserAlekseiBljahhin")}
            </p>
            <ul>
                <li className="Footer-item">
                    <a href="mailto:aleksei.bljahhin@gmail.com">
                        <i className="fas fa-envelope"></i>
                        aleksei.bljahhin@gmail.com
                    </a>
                </li>
                <li className="Footer-item">
                    <a href="tel:+3725142537">
                        <i className="fas fa-phone"></i>
                        +372 5142537
                    </a>
                </li>
            </ul>
        </div>
    );
}
export default Footer;

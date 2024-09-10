import React from "react";
import "./Footer.css";
import { useTranslation } from 'react-i18next';

const Footer = () => {

  const { t } = useTranslation();
  
  return (
    <div className="footer-c">
      <p className="rights">
      {t('created by')}
      </p>
    </div>
  );
};

export default Footer;

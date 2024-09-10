import React from "react";
import { Table } from "react-bootstrap";
import "./UserInfoTable.css";
import {
  BsFillSunFill,
  BsFillFilterSquareFill,
  BsGem,
  BsTrophy,
  BsCoin,
} from "react-icons/bs";
import { useTranslation } from "react-i18next";

export default function UserInfoTable({
  total_points,
  total_coins,
  active_days,
  total_answered_questions,
  total_rewards,
}) {
  const { t } = useTranslation();
  return (
    <Table>
      <thead className="thead-light table-header">
        <tr>
          <th scope="col" className="table-header">
          {t('CATEGORY')}
          </th>
          <th scope="col" className="table-header-amount">
          {t('AMOUNT')}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="body-text">
            <BsFillSunFill
              size={25}
              className="category-icon"
              color={"#F2B84B"}
            />
            {t('Days played')}
          </td>
          <td data-label="Days played" className="body-text">
            {active_days} {t('days')}
          </td>
        </tr>
        <tr>
          <td className="body-text">
            <BsFillFilterSquareFill
              size={25}
              className="category-icon"
              color={"#FF6665"}
            />
            {t('Questions answered')}
          </td>
          <td data-label="Questions you answered" className="body-text">
            <span>{total_answered_questions} {t('questions')}</span>
          </td>
        </tr>
        <tr>
          <td className="body-text">
            <BsGem size={25} className="category-icon" color={"#47B0F1"} />
            {t('Points')}
          </td>
          <td data-label="Your points" className="body-text">
            <span>{total_points} {t('points')}</span>
          </td>
        </tr>
        <tr>
          <td className="body-text">
            <BsTrophy size={25} className="category-icon" color={"#F2B84B"} />
            {t('Badges')}
          </td>
          <td>
            <span>{total_rewards}</span>
          </td>
        </tr>
        <tr>
          <td className="body-text">
            <BsCoin size={25} className="category-icon" color={"#28A3EE"} />
            {t('Your Coins')}
          </td>
          <td data-label="Your coins" className="body-text">
            <span>
              {total_coins} {t("coins")}
            </span>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

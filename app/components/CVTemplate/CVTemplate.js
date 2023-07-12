import React from 'react';
import { IoSchoolOutline } from 'react-icons/io5';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { FiAnchor } from 'react-icons/fi';
import CVSectionTitle from '../CVSectionTitle/CVSectionTitle';
import { RiMedalLine } from 'react-icons/ri';

import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

function CVTemplate({ cvData }) {
  const styles = StyleSheet.create({
    container: {},
    contentWrapper: {
      flexDirection: 'column',
      padding: 40,
      gap: 20,
    },
    personalInfoWrapper: {
      flexDirection: 'column',
      gap: 10,
    },
    nameText: {
      fontSize: 24,
      letterSpacing: 1,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
    },
    positionText: {
      fontSize: 15,
      letterSpacing: 0.5,
    },
    contactInfoWrapper: {
      flexDirection: 'row',
      gap: 20,
    },
    contact: {
      flexDirection: 'row',
      gap: 5,
    },
    important: {
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 12,
      marginRight: 5,
    },
    contactText: {
      fontSize: 12,
      fontFamily: 'Roboto',
    },
    descriptionWrapper: {
      flexDirection: 'column',
      width: '100%',
    },
    descriptionText: {
      fontSize: 12,
      lineHeight: 1.5,
      fontFamily: 'Roboto',
    },
  });

  Font.register({
    family: 'Roboto',
    fonts: [
      {
        src: 'http://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf',
      },
      {
        src: 'http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf',
        fontWeight: 'bold',
      },
      {
        src: 'http://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1Mu52xPKTM1K9nz.ttf',
        fontWeight: 'normal',
        fontStyle: 'italic',
      },
    ],
  });

  return (
    <Document>
      <Page size='A4'>
        <View style={styles.container}>
          <View style={styles.contentWrapper}>
            {/* PERSONAL INFO */}
            <View style={styles.personalInfoWrapper}>
              <Text style={styles.nameText}>{cvData.fullName}</Text>
              <Text style={styles.positionText}>{cvData.occupation}</Text>
              <View style={styles.contactInfoWrapper}>
                <View style={styles.contact}>
                  <Text style={styles.important}>Email</Text>
                  <Text style={styles.contactText}>{cvData.email}</Text>
                </View>
                <View style={styles.contact}>
                  <Text style={styles.important}>Phone</Text>
                  <Text style={styles.contactText}>{cvData.phoneNumber}</Text>
                </View>
                <View style={styles.contact}>
                  <Text style={styles.important}>Location</Text>
                  <Text style={styles.contactText}>{cvData.location}</Text>
                </View>
              </View>
              <View style={styles.descriptionWrapper}>
                <Text style={styles.descriptionText}>{cvData.description}</Text>
              </View>
            </View>
            {/* WORK */}
            <CVSectionTitle
              title='Work History'
              jobExperienceList={cvData.jobExperienceList}
            />
            {/* EDUCATION */}
            <CVSectionTitle
              title='Education'
              educationList={cvData.educationList}
            />
            {/* SKILLS */}
            <CVSectionTitle
              title='Skills'
              type='bullet points'
              achievements={cvData.skillsList}
            />
            {/* CERTIFICATES */}
            <CVSectionTitle
              title='Certificates'
              type='bullet points'
              achievements={cvData.certificatesList}
            />
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default CVTemplate;

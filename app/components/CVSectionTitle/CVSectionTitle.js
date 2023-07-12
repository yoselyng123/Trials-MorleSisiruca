import React from 'react';
import styles from './CVSectionTitle.module.css';
import { View, Text, Font, StyleSheet } from '@react-pdf/renderer';

function CVSectionTitle({
  title,
  jobExperienceList,
  educationList,
  type,
  achievements,
}) {
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

  const styles = StyleSheet.create({
    container: {
      gap: 10,
      flexWrap: 'wrap',
    },
    sectionTitleContainer: {
      flexDirection: 'row',
      gap: 7,
      alignItems: 'center',
    },
    sectionIconWrapper: {
      backgroundColor: '#323232',
      width: 5,
      height: 20,
    },
    titleText: {
      fontSize: 12,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
    },
    infoContainer: {
      flexDirection: 'row',
      gap: 20,
    },
    dateText: {
      fontSize: 11,
    },
    infoWrapper: {
      flexDirection: 'column',
      gap: 5,
      flexWrap: 'wrap',
      width: '100%',
    },
    infoTitle: {
      fontSize: 12,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
    },
    infoSubtitle: {
      fontFamily: 'Roboto',
      fontStyle: 'italic',
      fontSize: 12,
    },
    achievementText: {
      fontFamily: 'Roboto',
      fontSize: 12,
    },
    bulletPointsWrapper: {
      flexWrap: 'wrap',
      width: '100%',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.sectionTitleContainer}>
        <View style={styles.sectionIconWrapper} />
        <Text style={styles.titleText}>{title}</Text>
      </View>
      {type === 'bullet points' ? (
        <View style={styles.bulletPointsWrapper}>
          {achievements?.map((achievement, index) => (
            <Text style={styles.achievementText} key={index}>
              • {achievement}
            </Text>
          ))}
        </View>
      ) : jobExperienceList ? (
        jobExperienceList.map((job, index) => (
          <View style={styles.infoContainer} key={index}>
            <Text style={styles.dateText}>
              {`${job.startMonth} ${job.startYear} - ${job.endMonth} ${job.endYear}`}
            </Text>
            <View style={styles.infoWrapper}>
              <Text style={styles.infoTitle}>
                {job.companyName} | {job.location}
              </Text>
              <Text style={styles.infoSubtitle}>{job.title}</Text>
              {job.achievements?.map((achievement, index) => (
                <Text style={styles.achievementText} key={index}>
                  • {achievement}
                </Text>
              ))}
            </View>
          </View>
        ))
      ) : (
        educationList.map((education, index) => (
          <View style={styles.infoContainer} key={index}>
            <Text style={styles.dateText}>
              {`${education.startMonth} ${education.startYear} - ${education.endMonth} ${education.endYear}`}
            </Text>
            <View style={styles.infoWrapper}>
              <Text style={styles.infoTitle}>
                {education.schoolName} | {education.location}
              </Text>
              <Text style={styles.infoSubtitle}>{education.fieldOfStudy}</Text>
              {education.achievements?.map((achievement, index) => (
                <Text style={styles.achievementText} key={index}>
                  • {achievement}
                </Text>
              ))}
            </View>
          </View>
        ))
      )}
    </View>
  );
}

export default CVSectionTitle;

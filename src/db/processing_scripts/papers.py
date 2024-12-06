import pandas as pd
import numpy as np


# Load df from csv files
papers = pd.read_csv("../original_data/survey-data - Main Sheet.csv")
effectsXuser = pd.read_csv(
    "../original_data/survey-data - [TORS] Effects x User.csv")
hypotheses = pd.read_csv(
    "../original_data/survey-data - Hypotheses (effects of expl).csv")
modalities = pd.read_csv("../original_data/survey-data - Expl. Modalities.csv")

# Isolate relevant columns
papers = papers[['PaperID', 'First author', 'Title', 'Year',
                 'Venue', 'domain category', 'RecSys Model category']]
effectsXuser = effectsXuser[['Paper ID', 'User Characteristic']]
hypotheses = hypotheses[['Paper ID', 'Main DV Category']]
modalities = modalities[['Paper ID',
                         'Display (modality)', 'Model-instrinsic or Post-hoc?']]

# Rename columns
papers = papers.rename(columns={
    'PaperID': 'paperId',
    'Title': 'title',
    'First author': 'firstAuthor',
    'Year': 'year',
    'Venue': 'venue',
    'domain category': 'domainCategory',
    'RecSys Model category': 'recSysModelCategory'})
effectsXuser = effectsXuser.rename(
    columns={'Paper ID': 'paperId', 'User Characteristic': 'userCharacteristic'})
hypotheses = hypotheses.rename(
    columns={'Paper ID': 'paperId', 'Main DV Category': 'mainDvCategory'})
modalities = modalities.rename(
    columns={'Paper ID': 'paperId', 'Display (modality)': 'displayModality',
             'Model-instrinsic or Post-hoc?': 'modelInstrinsicOrPosthoc'})


# Preprocess papers
# Convert 'domainCategory', 'recSysModelCategory' to title case
papers['domainCategory'] = papers['domainCategory'].str.title()
papers['recSysModelCategory'] = papers['recSysModelCategory'].str.title()
papers['recSysModelCategory'] = papers['recSysModelCategory'].apply(
    lambda x: x if x != 'None' else np.nan)
papers['recSysModelCategory'] = papers['recSysModelCategory'].str.replace('Unclear', '')
papers['domainCategory'] = papers['domainCategory'].str.replace('-', '')
papers['domainCategory'] = papers['domainCategory'].str.replace('Poi', 'POI')
papers['domainCategory'] = papers['domainCategory'].str.replace(
    'ECommerce', 'E-Commerce')


# Preprocess hypotheses
# convert effects cells to title case
hypotheses['mainDvCategory'] = hypotheses['mainDvCategory'].str.title()

# String replace effects cells in hypotheses to match the cells in the "effects x user" table
hypotheses['mainDvCategory'] = hypotheses['mainDvCategory'].str.replace(
    'Interface Quality', 'Usability/UX')
hypotheses['mainDvCategory'] = hypotheses['mainDvCategory'].str.replace(
    'User Perception Of Explanation Quality', 'Perceived Explanation Quality')

# Ensure that only certain values are in the 'mainDvCategory' column
allowed_effects = ['Trust', 'Persuasiveness', 'Effectiveness', 'Transparency',
                   'Efficiency', 'Usability/UX', 'Perceived Explanation Quality',
                   'Satisfaction', 'Explanation Preference', 'Other']
assert all(
    item in allowed_effects for item in hypotheses['mainDvCategory'].unique())

# Aggregate 'mainDvCategory' column by 'paperId'
hypotheses = hypotheses.groupby('paperId').agg(
    {'mainDvCategory': lambda x: sorted(list(set(x)))}).reset_index()


# Preprocess effectsXuser
# Convert 'userCharacteristic' to title case
effectsXuser['userCharacteristic'] = effectsXuser['userCharacteristic'].str.title()

# Aggregate 'userCharacteristic' column by 'paperId'
effectsXuser = effectsXuser.groupby('paperId').agg(
    {'userCharacteristic': lambda x: sorted(list(set(x)))}).reset_index()


# Preprocess modalities
# Convert 'modelInstrinsicOrPosthoc' to title case
modalities['modelInstrinsicOrPosthoc'] = modalities['modelInstrinsicOrPosthoc'].str.title()

# String replace 'modelinstrinsicOrPosthoc' in modalities to match
# the cells in the "effects x user" table
modalities['modelInstrinsicOrPosthoc'] = modalities['modelInstrinsicOrPosthoc'].str.replace(
    'Post-Hoc (But Causality)', 'Post-Hoc')
modalities['modelInstrinsicOrPosthoc'] = modalities['modelInstrinsicOrPosthoc'].str.replace(
    'Model-Intrinsic?', 'Model-Intrinsic')
modalities['modelInstrinsicOrPosthoc'] = modalities['modelInstrinsicOrPosthoc'].str.replace(
    'Model Intrinsic', 'Model-Intrinsic')
modalities['modelInstrinsicOrPosthoc'] = modalities['modelInstrinsicOrPosthoc'].apply(
    lambda x: x if x in ['Model-Intrinsic', 'Post-Hoc'] else np.nan)

# Ensure that only certain values are in the 'modelInstrinsicOrPosthoc' column
allowed_categories = ['Model-Intrinsic', 'Post-Hoc', np.nan]
assert all(
    item in allowed_categories for item in modalities['modelInstrinsicOrPosthoc'].unique())


# Convert 'displayModality' to title case
modalities['displayModality'] = modalities['displayModality'].str.title()

# Ensure that only certain values are in the 'displayModality' column
allowed_modalities = ['Text', 'Visual', 'Tabular', 'Graphical', 'Other']
assert all(
    item in allowed_categories for item in modalities['modelInstrinsicOrPosthoc'].unique())

# Aggregate 'displayModality' and 'modelInstrinsicOrPosthoc' columns by 'paperId'
modalities = modalities.groupby('paperId').agg({
    'displayModality': lambda x: sorted(list(set(x))),
    'modelInstrinsicOrPosthoc': lambda x: list(set(x))
}).reset_index()

modalities['modelInstrinsicOrPosthoc'] = modalities['modelInstrinsicOrPosthoc'].apply(
    lambda x: [item for item in x if str(item) != 'nan'])
modalities['modelInstrinsicOrPosthoc'] = modalities['modelInstrinsicOrPosthoc'].apply(
    sorted)


# Join papers, hypotheses, and modalities
df = pd.merge(papers, hypotheses, left_on='paperId',
              right_on='paperId', how='left')
df = pd.merge(df, effectsXuser, left_on='paperId',
              right_on='paperId', how='left')
df = pd.merge(df, modalities, left_on='paperId',
              right_on='paperId', how='left')

# Renmae columns
df = df.rename(columns={'mainDvCategory': 'effects',
                        'domainCategory': 'domain',
                        'displayModality': 'modalities',
                        'modelInstrinsicOrPosthoc': 'explainabilityType',
                        'recSysModelCategory': 'recommenderType'})


# add an key column to the front of the df
df.insert(0, 'key', range(1, len(df) + 1))

# show the number of rows with the different fields in domain
# print(df['domain'].value_counts())


# print disting values in each column
# print(df['effects'].explode().unique())
# print(df['userCharacteristic'].explode().unique())
# print(df['modalities'].explode().unique())
# print(df['explainabilityType'].explode().unique())

df.to_json("../papers.json", orient='records', indent=4)

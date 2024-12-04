import json
import pandas as pd
import numpy as np


def flatten(xss):
    return [x for xs in xss for x in xs]


# Load df from csv files
effectsXuser = pd.read_csv(
    "../original_data/survey-data - [TORS] Effects x User.csv")
papers = pd.read_csv("../original_data/survey-data - Main Sheet.csv")

# Isolate relevant columns
effectsXuser = effectsXuser[['Paper ID', 'Measured Effect (main category)',
                             'User Characteristic', 'Effect found?', 'Domain',
                             'Modality', 'Explainability Type ', 'Recommender Type']]

# Rename columns
effectsXuser = effectsXuser.rename(
    columns={'Paper ID': 'paperId',
             'Measured Effect (main category)': 'measuredEffect',
             'User Characteristic': 'userCharacteristic',
             'Effect found?': 'effectFound',
             'Domain': 'domain',
             'Modality': 'modality',
             'Explainability Type ': 'explainabilityType',
             'Recommender Type': 'recommenderType'})

# Convert to title case
effectsXuser['measuredEffect'] = effectsXuser['measuredEffect'].str.title()
effectsXuser['userCharacteristic'] = effectsXuser['userCharacteristic'].str.title()
effectsXuser['effectFound'] = effectsXuser['effectFound'].str.title()
effectsXuser['domain'] = effectsXuser['domain'].str.title()
effectsXuser['modality'] = effectsXuser['modality'].str.title()
effectsXuser['explainabilityType'] = effectsXuser['explainabilityType'].str.title()
effectsXuser['recommenderType'] = effectsXuser['recommenderType'].str.title()


# Convert the modality column to a list
effectsXuser['modality'] = effectsXuser['modality'].apply(
    lambda x: [item.strip() for item in x.split('+')])

# Replace '-' with np.nan
effectsXuser = effectsXuser.replace('-', np.nan)

# Replace 'Poi' with 'POI' in 'domain'
effectsXuser['domain'] = effectsXuser['domain'].replace('Poi', 'POI')


# Get all the destinct userCharacteristic and measuredEffectMainCategory
# pairs and aggregate the rest to a list
effectsXuserAgg = effectsXuser.groupby(['userCharacteristic', 'measuredEffect']).agg({
    'effectFound': lambda x: sorted(list(set(x))),
    'domain': lambda x: sorted(list(set(x))),
    'modality': lambda x: sorted(list(set(flatten(x)))),
    'explainabilityType': lambda x: list(set(x)),
    'recommenderType': lambda x: list(set(x)),
    'paperId': lambda x: list(set(x)),
}).reset_index()

# Remove nan from all list in 'explainabilityType' and 'nan' and 'None' from recommenderType'
effectsXuserAgg['explainabilityType'] = effectsXuserAgg['explainabilityType'].apply(
    lambda x: [item for item in x if str(item) != 'nan'])
effectsXuserAgg['recommenderType'] = effectsXuserAgg['recommenderType'].apply(
    lambda x: [item for item in x if str(item) != 'nan'])
effectsXuserAgg['recommenderType'] = effectsXuserAgg['recommenderType'].apply(
    lambda x: [item for item in x if str(item) != 'None'])
effectsXuserAgg['explainabilityType'] = effectsXuserAgg['explainabilityType'].apply(
    sorted)
effectsXuserAgg['recommenderType'] = effectsXuserAgg['recommenderType'].apply(
    sorted)

# add an key column to the front of the df
effectsXuserAgg.insert(0, 'key', range(1, len(effectsXuserAgg) + 1))


# Iterate through the rows and aggregate the rows (with added data) in a list
dict_list = []
for row in effectsXuserAgg.to_dict(orient='records'):

    # iterate through the paperIds
    local_list = []
    for paperId in row['paperId']:
        # get the paperTitle
        title = papers[papers['PaperID'] == paperId]['Title'].values[0]
        firstAuthor = papers[papers['PaperID']
                             == paperId]['First author'].values[0]
        venue = papers[papers['PaperID'] == paperId]['Venue'].values[0]
        url = papers[papers['PaperID'] == paperId]['URL'].values[0]

        assert len(papers[papers['PaperID'] == paperId]['Title'].values) == 1
        assert len(papers[papers['PaperID'] == paperId]
                   ['First author'].values) == 1
        assert len(papers[papers['PaperID'] == paperId]['Venue'].values) == 1
        assert len(papers[papers['PaperID'] == paperId]['URL'].values) == 1

        filter = (effectsXuser['paperId'] == paperId) & \
                 (effectsXuser['userCharacteristic'] == row['userCharacteristic']) & \
                 (effectsXuser['measuredEffect'] == row['measuredEffect'])

        effectFound = sorted(
            list(set(effectsXuser[filter]['effectFound'].values)))
        modality = sorted(
            list(set(flatten(effectsXuser[filter]['modality'].values))))
        recommenderType = sorted(
            list(set(effectsXuser[filter]['recommenderType'].values)))
        domain = effectsXuser[filter]['domain'].values[0]
        explainabilityType = effectsXuser[filter]['explainabilityType'].values[0]

        recommenderType = [
            item for item in recommenderType if str(item) != 'nan']

        # Replace NaN with empty string
        explainabilityType = "" if explainabilityType != explainabilityType else explainabilityType
        recommenderType = "" if recommenderType != recommenderType else recommenderType

        local_list.append({'paperId': paperId,
                           'title': title,
                           'firstAuthor': firstAuthor,
                           'venue': venue,
                           'url': url,
                           'effectFound': effectFound,
                           'domain': domain,
                           'modality': modality,
                           'explainabilityType': explainabilityType,
                           'recommenderType': recommenderType})

    row['level2'] = local_list
    dict_list.append(row)

# Write to file
with open('../characteristics_effects.json', 'w') as f:
    json.dump(dict_list, f, indent=4)

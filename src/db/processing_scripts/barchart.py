import json
import pandas as pd

df = pd.read_csv(
    "../original_data/survey-data - [TORS] Effects x User.csv")


effects = ['effectiveness', 'efficiency', 'perceived explanation quality',
           'transparency', 'trust', 'persuasiveness', 'Usability/UX']
user_characteristics = ['age', 'agreeableness', 'conscientiousness', 
                        'country of residence', 'decision-making strategy', 
                        'domain knowledge', 'extraversion', 'gender', 
                        'level of education', 'need for cognition', 
                        'neuroticism', 'openness', 'personal innovativeness', 
                        'propensity to trust others', 'rationality', 
                        'social awareness', 'technical expertise', 
                        'trust in technology', 'valence', 
                        'visualization literacy']

colors = ['#03045E',
          '#023E8A',
          '#0077B6',
          '#0096C7',
          '#00B4D8',
          '#48CAE4',
          '#90E0EF']


# Iterate over tuples of effects and user characteristics
datasets = []
for i, effect in enumerate(effects):
    data_pos = []
    data_neg = []
    for char in user_characteristics:
        filtered = df[(df['Measured Effect (main category)'] ==
                       effect) & (df['User Characteristic'] == char)]

        # Count the number of positive and negative effects found
        counter_pos = filtered[filtered['Effect found?'] == 'yes'].shape[0]
        counter_neg = -filtered[filtered['Effect found?'] == 'no'].shape[0]

        data_pos.append(counter_pos)
        data_neg.append(counter_neg)

    datasets.append({
        "label": f"{effect.title()}",
        "data": data_pos,
        "backgroundColor": colors[i],
    })
    datasets.append({
        "label": f"{effect.title()}-neg",
        "data": data_neg,
        "backgroundColor": colors[i],
    })


with open('../bar_chart_data.json', 'w') as file:
    json.dump(datasets, file, indent=2)

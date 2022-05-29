import pandas as pd
import numpy as np
from flask import Flask, render_template, request
# libraries for making count matrix and similarity matrix
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# define a function that creates similarity matrix
# if it doesn't exist
def create_sim():
    credits_df = pd.read_csv('tmdb_5000_credits.csv')
    movies_df = pd.read_csv('tmdb_5000_movies.csv')

    credits_df_rename = credits_df.rename(index=str, columns={'movie_id': 'id'})
    data = movies_df.merge(credits_df_rename, on='id')
    # creating a count matrix
    cv = CountVectorizer()
    count_matrix = cv.fit_transform(data['overview'])
    # creating a similarity score matrix
    sim = cosine_similarity(count_matrix)
    return data, sim


# defining a function that give_recs 10 most similar movies
def rcmd(m):
    m = m.lower()
    # check if data and sim are already assigned
    try:
        data.head()
        sim.shape
    except:
        data, sim = create_sim()
    # check if the movie is in our database or not
    if m not in data['original_title'].unique():
        return 'This movie is not in our database.\nPlease check if you spelled it correct.'
    else:
        # getting the index of the movie in the dataframe
        i = data.loc[data['original_title'] == m].index[0]

        # fetching the row containing similarity scores of the movie
        # from similarity matrix and enumerate it
        lst = list(enumerate(sim[i]))

        # sorting this list in decreasing order based on the similarity score
        lst = sorted(lst, key=lambda x: x[1], reverse=True)

        # taking top 1- movie scores
        # not taking the first index since it is the same movie
        lst = lst[1:11]

        # making an empty list that will containg all 10 movie give_recations
        l = []
        for i in range(len(lst)):
            a = lst[i][0]
            l.append(data['original_title'][a])
        return l


app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/giveRec', methods=['POST'])
def giveRec():
    movie = request.args.get('search-bar')
    r = rcmd(movie)
    if type(r) == type('string'):
        return render_template('index.html', movie = movie)
    else:
        return render_template('index.html', movie = movie)


if __name__ == '__main__':
    app.run(debug=True)
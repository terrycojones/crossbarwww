Once you've installed Crossbar, you can **update to the newest release version** at any time by doing

```
pip install -U crossbar
```

If you want to **update to the most current development version** (e.g. for testing), you can do so from the git repository.

## Cloning the repository

*Note: The Amazon EC2 or Microsoft Azure images we provide already have the git repository cloned.*

You need to have [git](http://git-scm.com/) installed. 

If you're not registered on GitHub you can clone the repository by doing 

```
git clone https://github.com/crossbario/crossbar.git
```

else we suggest using SSH

```
git clone git@github.com:crossbario/crossbar.git
```

Then clone the repository into a directory `crossbar` in your current directory.

If you want to name the directory differently, just add that directory name at the end, e.g.

```
git clone https://github.com/crossbario/crossbar.git crossbar_source
```

## Updating the repository clone

Unless you've just cloned the repository, you need to update it before installing. In a shell, in the repository directory, do

```
git pull
```

Then you can update your Crossbar.io installation by doing

```
cd crossbar
python setup.py install
```

## Installation from the repository

You can also install from the repository doing the above. On Windows, this will most likely  require installing the [Microsoft Visual C++ Compiler for Python 2.7](http://www.microsoft.com/en-us/download/details.aspx?id=44266). 
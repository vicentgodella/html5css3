HTML5 and CSS3 course
=====================

These are the contents of the **HTML5 and CSS3** course available at http://html5.instructormatters.com.

Slides
------

To generate the static HTML files from the jade sources, execute:

	$ cd slides
	$ npm install
	$ slides/build

The HTML files will be written into the `generated` folder.

These slides are based on [reveal.js](http://lab.hakim.se/reveal-js/), [jade](http://jade-lang.com/) and [LESS](http://lesscss.org/). They are tested only in the latest version of Chrome.

Labs
----

To generate the node.js dependencies of the labs:
	
	$ cd labs
	$ npm install

Each lab is contained in its own folder with two subfolders: `before`, containing the source code for the lab, and `after` with a finished version, useful for peeking in case of getting lost.

License
-------
The materials of the course are licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en`US), with an exception to the NonCommercial clause to be able to deliver courses commercially for your own purposes.
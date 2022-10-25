const Post = require('../models/Post');

exports.createPost = (req, res, next) => {
  const dateNow = Date.now()
  const postObject = req.body;
  const post = new Post({
    userId: postObject.userId,
    title: postObject.title,
    description: postObject.description,
    createdAt: dateNow,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    likes : 0,
    dislikes : 0,
    usersLiked : [],
    usersDisliked : [],
  });

  post.save().then(
    () => {
      res.status(201).json({
        message: 'Post sauvegardé avec succès'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({ error: error });
    }
  );
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({
      _id: req.params.id
    }).then(
      (post) => {
        res.status(200).json(post);
      }
    ).catch(
      (error) => {
        res.status(404).json({ error: error });
      }
    );
  };
  
  exports.modifyPost = (req, res, next) => {
    const body = req.body
    const postObject = req.file ?
    {
      ...body,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    }: {...req.body}
    Post.updateOne({_id: req.params.id}, postObject).then(
      () => {
        res.status(201).json({
          message: 'Post modifié avec succès'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({ error: error });
      }
    );
  };
  
  exports.deletePost = (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Post supprimé avec succès'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({ error: error });
      }
    );
  };
  
  exports.getAllPost = (req, res, next) => {
    Post.find().sort({createdAt: 'desc'}).then(
      (posts) => {
        res.status(200).json(posts);
      }
    ).catch(
      (error) => {
        res.status(400).json({ error: error });
      }
    );
  };

  exports.likes = (req, res, next) => {
    Post.findOne({
      _id: req.params.id
    }).then((currentPost) => {
      if(currentPost.usersLiked.includes(req.auth.userId)){
        let likedIndex = currentPost.usersLiked.indexOf(req.auth.userId)
        currentPost.usersLiked.splice(likedIndex)
      }
      if(currentPost.usersDisliked.includes(req.auth.userId)){
        let dislikedIndex = currentPost.usersDisliked.indexOf(req.auth.userId)
        currentPost.usersDisliked.splice(dislikedIndex)
      }
      if(parseInt(req.params.likes) === 1){
        currentPost.usersLiked.push(req.auth.userId)
      }else if(parseInt(req.params.likes) === -1){
        currentPost.usersDisliked.push(req.auth.userId)
      }
      currentPost.likes = currentPost.usersLiked.length

      currentPost.dislikes = currentPost.usersDisliked.length
      currentPost.save()
        .then(() => res.status(200).json({ message: "Mise à jour des likes et des dislikes"}))
        .catch((error) => res.status(400).json(error))
      }
    ).catch(
      (error) => {
        res.status(404).json({ error: error });
      }
    );
  }
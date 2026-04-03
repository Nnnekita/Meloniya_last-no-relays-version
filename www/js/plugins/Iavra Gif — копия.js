#==============================================================================
#   Lethrface's Splash Screen
#   v1.0
#   Date: 4-16-2012
#   My official website:
#   http://spriteresources.blogspot.com
#   Also visit:
#   http://www.creationasylum.net
#==============================================================================
#   Description: Shows an image or a movie before jumping to the title screen.
#==============================================================================
#   Import your splash images to the Title2 folder and your movies
#   as you normally would in the Movies folder. After that, modify the 
#   values in the configuration module below by reading the comments
#   and following instructions.  The instructions are self explanatory
#   so you should have no problems.
#
#   This script should be compatible with any script unless it modifies
#   SceneManager's self.first_scene_class function.  If it does, I can not
#   insure it's functionality.
#
#   If you are unsure what format your movie is supposed to be in, 
#   please read the help file included with RPG Maker VX Ace.  
#
#   I will not provide support to those who do not wish to follow directions.
#==============================================================================
#                         --NON-COMMERCIAL USE ONLY--
#   This script by Steven Wallace(Lethrface) is licensed under a 
#   Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License.
#   Permissions beyond the scope of this license may be available at 
#   http://spriteresources.blogspot.com/.
#
#                 Information about this license can be found at:
#               http://creativecommons.org/licenses/by-nc-nd/3.0/
#
#   This script is intended for use with Non-Commercial/Non-Monitary projects.  
#   If you wish to use this for commercial use or any project that has a 
#   monitary attachment (such as donations, etc.), you just contact me before
#   you use this script for permission.
#==============================================================================
module LethrMod
  module SPLASH
    #===============================================================#
    #                  EDIT THE CONFIGURATION BELOW                 #
    #===============================================================#
    
    # Set the amount of time the splash image will remain on the
    # screen after fading in before fading out.
    LENGTH = 2
    
    # Set the number of splash screens you plan to use for your project.  
    # This can be any number of splash screens...but use them within reason...
    # Nobody wants to see 100 splash screens before seeing the title screen
    # and if they do, they are narcisists.
    TOTAL_SPLASH_IMAGES = 3
    
    
    SPLASH_IMAGES = {
    
    # Set the filename of the images and/or movies that you want to be used
    # for your splash screens.
    # You can add more past the three that you see now.  If you do, make sure
    # that the TOTAL_SPLASH_IMAGES count is set to the total you have here.
    
    # Use just the filename of the image or movie.
    # Your first one will always start with "0" as your first
    # Splash image.
    # ex. 0 => "filename",  
      0 => "Logo",
      1 => "Logo2",
      2 => "Logo3",
    } # Do not delete this bracket
    
    
    MOVIE = {
    
    # Set which splash images are actually movies.  
    # Each entry corresponds with the images/movies assigned
    # in the SPLASH_IMAGES array.
    # Just like the SPLASH_IMAGES array, you can add more past the
    # three that you see now.  If here are more than three images
    # set in SPLASH_IMAGES, you add more variables to reflect
    # the number of values for SPLASH_IMAGES.
    
    # ex. 0 => false,            <== means it's an image
    # ex  0 => true,             <== it will be a movie.
    0 => false,
    1 => false,
    2 => false,
    }  # Do not delete this bracket
    
    # Do you want to see your Splash screens before your title screen when
    # you playtest?  True for yes, false for no.
    SHOW_PLAYTEST = true
    
    
    #===============================================================#
    #                DONT MODIFY ANYTHING BELOW THIS                #
    #===============================================================#
  end
end

module SceneManager
  def self.first_scene_class
    $BTEST ? Scene_Battle : Scene_Splash
  end
end


class Scene_Splash < Scene_Base
  
  def start
    super
    show_playtest = LethrMod::SPLASH::SHOW_PLAYTEST
    SceneManager.goto(Scene_Title) if $TEST and !show_playtest
    SceneManager.clear
    create_image
  end
  
  def create_image
    @current_splash = 0
    @splash = Sprite.new
    set_vars
  end
  
  def set_vars
    @phase = 0
    if LethrMod::SPLASH::MOVIE[@current_splash] == false
      @splash.bitmap = Cache.title2(LethrMod::SPLASH::SPLASH_IMAGES[@current_splash].to_s)
    end
    @splash.opacity = 0
    @splash_duration = LethrMod::SPLASH::LENGTH * 30
  end
  
  def update
    Graphics.update
    if LethrMod::SPLASH::TOTAL_SPLASH_IMAGES > 0
      if LethrMod::SPLASH::MOVIE[@current_splash] == true
        Graphics.play_movie("Movies/" + LethrMod::SPLASH::SPLASH_IMAGES[@current_splash])
        @phase = 3
      end
    
      if @phase == 0
        @splash.opacity += 10
        if @splash.opacity >= 255
          @phase = 1
        end
      end
    
      if @phase == 1
        if @splash_duration > 0
          @splash_duration -= 1
          return
        else
          @phase = 2
        end
      end
    
      if @phase == 2
        @splash.opacity -= 10
        if @splash.opacity <= 0
          @phase = 3
        end
      end
    
      if @phase == 3
        @current_splash += 1
        if @current_splash >= LethrMod::SPLASH::TOTAL_SPLASH_IMAGES
          SceneManager.goto(Scene_Title)
        else
          set_vars
        end
      end
    else
      SceneManager.goto(Scene_Title)
    end
    
  end
end